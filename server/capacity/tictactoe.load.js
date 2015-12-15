var action = require('../fluid-api/tictactoeFluid').action;
var given = require('../fluid-api/tictactoeFluid').given;

it('Should play 1000 games in x seconds.', function (done) {
  var doneCount = 0;
  var gamesToPlay = 250;
  var x = 7;

  this.timeout(x * 1000);

  var QED = function () {
    if (gamesToPlay === ++doneCount) {
      done();
    }
  };

    for (var gameId = 0; gameId < gamesToPlay; gameId++) {
        given(action("Steinar").createGame("GameIdOne").withName("TheFirstGame"))
            .withId(gameId)
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
        .expect("GameDraw").byUser("Steinar").finish(QED);
    }
});
