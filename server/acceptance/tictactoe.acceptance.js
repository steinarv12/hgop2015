'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

var given = require('../fluid-api/tictactoeFluid').given;
var action = require('../fluid-api/tictactoeFluid').action;

describe('TEST ENV GET /api/gameHistory', function () {

  it('Should have ACCEPTANCE_URL environment variable exported.', function () {
    /*jshint -W030 */
    acceptanceUrl.should.be.ok;
  });

  it('should execute same test using old style', function (done) {

    var command = {
      gameId : "999",
      comm: "CreateGame",
      user: {"userName": "Gulli", "side": "X" },
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
                "gameId": "999",
                "event": "GameCreated",
                "user": {"userName": "Gulli", "side": "X" },
                "name": "TheFirstGame",
                "timeStamp": "2014-12-02T11:29:29"
              }]);
            done();
          });
      });
  });


    it('Should execute fluid API test', function (done) {
        given(action("Steinar").createGame("TheFirstGame")).withId(170)
        .expect("GameCreated").byUser("Steinar").finish(done);
    });

    it('Should play game until won or drawn', function (done) {
        given(action("Steinar").createGame("GameIdOne").withName("TheFirstGame"))
            .withId(180)
            .and(action("Gunni").joinGame("GameIdOne"))
            .and(action("Steinar").placeAt(0,0,"X"))
            .and(action("Gunni").placeAt(0,1,"O"))
            .and(action("Steinar").placeAt(0,2,"X"))
            .and(action("Gunni").placeAt(1,1,"O"))
            .and(action("Steinar").placeAt(1,0,"X"))
            .and(action("Gunni").placeAt(2,0,"O"))
            .and(action("Steinar").placeAt(1,2,"X"))
            .and(action("Gunni").placeAt(2,2,"O"))
            .and(action("Steinar").placeAt(2,1,"X"))
        .expect("Draw").byUser("Steinar").finish(done);
    });
});
