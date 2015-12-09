'use strict';

// Replace player X and O with a way to
// map it to users

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

function sendCommand(cmd) {
    var req = request(acceptanceUrl);
    req
        .post(cmd.path)
        .type('json')
        .send(cmd)
        .end(function (err, res) {
            if (err) {
                console.log(err);
            }
        });
};

function getHistory(id, callback) {
    var req = request(acceptanceUrl);
    req
      .get('/api/gameHistory/' + id)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        callback(res.body);
      });
};

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
        }
        finish: function(done) {
            for (var i = 0; i < commands.length; i++) {
                commands[i].gameId = expectEvent.id;
                sendCommand(commands[i], function(cntr) {
                    
                });
            }
            function compareToActual(actualEvents) {
                var lastEvent = actualEvents[actualEvents.length - 1];

                should(lastEvent.event).eql(expectEvent.eventName);
                should(lastEvent.userName).eql(expectEvent.userName);
                should(lastEvent.gameId).eql(expectEvent.id);
                done();
            }
            getHistory(expectEvent.id, compareToActual);
        }
    }
    return givenAPI;
};

function action(userName) {
    var commandAPI = {
        createGame: function(gameName) {
            this.cmd.name = gameName;
            this.cmd.comm = "CreateGame";
            this.cmd.path = "/api/createGame"
            return commandAPI;
        },
        withName: function(nameOfGame) {
            this.cmd.name = nameOfGame;
            return commandAPI;
        },
        placeAt: function(row, col) {
            this.cmd.place = [row, col];
            this.cmd.comm = "MakeMove";
            this.cmd.path = "/api/placeMove"
            return commandAPI;
        },
        joinGame: function(gameName) {
            this.cmd.comm = "JoinGame";
            this.cmd.name = gameName;
            this.cmd.path = "/api/joinGame"
            return commandAPI;
        },
        cmd: {
            id: 1234,
            gameId: 1111,
            comm: undefined,
            player: undefined,
            userName: undefined,
            place: undefined,
            name: undefined,
            timeStamp: "2014-12-02T11:29:29",
            path: undefined
        }
    }
    commandAPI.cmd.userName = userName;
    return commandAPI;
};

describe('TEST ENV GET /api/gameHistory', function () {

  it('Should have ACCEPTANCE_URL environment variable exported.', function () {
    acceptanceUrl.should.be.ok;
  });

  it('should execute same test using old style', function (done) {

    var command = {
      id : "1234",
      gameId : "999",
      comm: "CreateGame",
      userName: "Gulli",
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    };

    var req = request(acceptanceUrl);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function (err, res) {
        if (err) return done(err);
        request(acceptanceUrl)
          .get('/api/gameHistory/999')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            should(res.body).eql(
              [{
                "id": "1234",
                "gameId": "999",
                "event": "GameCreated",
                "userName": "Gulli",
                "name": "TheFirstGame",
                "timeStamp": "2014-12-02T11:29:29"
              }]);
            done();
          });
      });
  });


    it('Should execute fluid API test', function (done) {
        given(action("YourUser").createGame("TheFirstGame")).withId(170)
        .expect("GameCreated").byUser("YourUser").finish(done);
    });

    it('Should play game until won or drawn', function (done) {
        given(action("YourUser").createGame("GameIdOne").withName("TheFirstGame"))
            .withId(180)
            .and(action("OtherUser").joinGame("GameIdOne"))
            .and(action("YourUser").placeAt(0,0))
            .and(action("OtherUser").placeAt(1,1))
        .expect("GameDraw").byUser("OtherUser").finish("done");
    });

});
