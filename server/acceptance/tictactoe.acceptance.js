'use strict';

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
            console.log(res);
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
    expectEvent.id = action.cmd.id;
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
        finish: function(done) {
            function asyncEach(cmds, callback) {
                for (var i = 0; i < cmds.length; ++i) {
                    // boundCallback is a new function which has arr[i] permanently
                    // set (partially applied) as its first argument.  The "null" argument
                    // is the binding for the `this` context variable in the callback, which
                    // we don't care about in this example...
                    var boundCallback = callback.bind(null, cmds[i]);
                    setTimeout(boundCallback, 0);
                }
            }
            asyncEach(commands, sendCommand);
            function compareToActual(actualEvent) {
                should(actualEvent).eql(
                  [{
                    "id": "1234",
                    "gameId": "999",
                    "event": "GameCreated",
                    "userName": "Gulli",
                    "name": "TheFirstGame",
                    "timeStamp": "2014-12-02T11:29:29"
                  }]);
                done();
            }
            var actualEvents = getHistory(expectEvent.id, compareToActual);
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
     /*
     given(user("YourUser").createsGame("TheFirstGame"))
     .expect("GameCreated").withName("TheFirstGame").isOk(done);
     */
     done();
   });

});