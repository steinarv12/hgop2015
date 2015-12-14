var action = require('../fluid-api/tictactoeFluid').action;
var given = require('../fluid-api/tictactoeFluid').given;

it('Should play 1000 games in x seconds.', function (done) {
  var doneCount = 0;
  var gamesToPlay = 70;
  var x = 7;

  this.timeout(x * 1000);

  var QED = function () {
    if (gamesToPlay === ++doneCount) {
      done();
    }
  };

    for (var gameId = 0; gameId < gamesToPlay; gameId++) {
        given(action("Steinar").createGame("TheFirstGame")).withId(gameId)
        .expect("GameCreated").byUser("Steinar").finish(QED);
    }
});
