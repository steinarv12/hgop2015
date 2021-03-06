var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

function sendCommand(cmd, callback) {
    var req = request(acceptanceUrl);
    req
        .post(cmd.path)
        .type('json')
        .send(cmd)
        .end(function (err, res) {
            if (err) {
                console.log(err);
            }
            callback(res.body);
        });
}

function getHistory(id, callback) {
    var req = request(acceptanceUrl);
    req
      .get('/api/gameHistory/' + id)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        callback(res.body);
      });
}

function given(action) {
    var expectEvent = {
        eventName: undefined,
        userName: undefined,
        id: undefined
    }
    var commands = [];
    commands.push(action.cmd);

    var givenAPI = {
        and: function(action) {
            commands.push(action.cmd);
            return givenAPI;
        },
        expect: function(eventName) {
            expectEvent.eventName = eventName;
            return givenAPI;
        },
        byUser: function(userName) {
            expectEvent.userName = userName;
            return givenAPI;
        },
        withId: function(gameId) {
            expectEvent.id = gameId;
            return givenAPI;
        },
        finish: function(done) {
            function asyncLoop(iterations, func, callback) {
                var index = 0;
                var done = false;
                var loop = {
                    next: function() {
                        if (done) {
                            return;
                        }

                        if (index < iterations) {
                            index++;
                            func(loop);
                        } else {
                            done = true;
                            callback();
                        }
                    },

                    iteration: function() {
                        return index - 1;
                    },

                    break: function() {
                        done = true;
                        callback();
                    }
                };
                loop.next();
                return loop;
            }
            function compareToActual(actualEvents) {

                var lastEvent = actualEvents[actualEvents.length - 1];

                should(lastEvent.event).eql(expectEvent.eventName);
                should(lastEvent.user.userName).eql(expectEvent.userName);
                should(lastEvent.gameId).eql(expectEvent.id);
                done();
            }
            function compareAsync() {
                getHistory(expectEvent.id, compareToActual);
            }
            asyncLoop(commands.length, function(loop) {
                commands[loop.iteration()].gameId = expectEvent.id;
                sendCommand(commands[loop.iteration()], function(result) {
                    loop.next();
                })},
                compareAsync
            );
        }
    }
    return givenAPI;
}

function action(userName) {
    var commandAPI = {
        createGame: function(gameName) {
            this.cmd.name = gameName;
            this.cmd.comm = "CreateGame";
            this.cmd.path = "/api/createGame"
            this.cmd.user.side = "X";
            return commandAPI;
        },
        withName: function(nameOfGame) {
            this.cmd.name = nameOfGame;
            return commandAPI;
        },
        placeAt: function(row, col, side) {
            this.cmd.move.xy = [row, col];
            this.cmd.comm = "MakeMove";
            this.cmd.path = "/api/placeMove"
            this.cmd.move.side = side;
            return commandAPI;
        },
        joinGame: function(gameName) {
            this.cmd.comm = "JoinGame";
            this.cmd.name = gameName;
            this.cmd.path = "/api/joinGame";
            this.cmd.user.side = "O";
            return commandAPI;
        },
        cmd: {
            id: 1234,
            gameId: undefined,
            comm: undefined,
            user: {'userName': undefined, side: undefined},
            move: {'xy': undefined, 'side': undefined},
            name: undefined,
            timeStamp: "2014-12-02T11:29:29",
            path: undefined
        }
    }
    commandAPI.cmd.user.userName = userName;
    return commandAPI;
}

module.exports.action = action;
module.exports.given = given;
