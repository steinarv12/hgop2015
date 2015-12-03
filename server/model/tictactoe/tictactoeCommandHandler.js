module.exports = function tictactoeCommandHandler(events) {
  var gameCreatedEvent = events[0];

  var boardState = [['','',''],
		    ['','',''],
		    ['','','']];

  var checkWin = function () {
    // Horizontal win check
    for (var i = 0; i < 3; i++) {
	if (boardState[i][0] === boardState[i][1] && 
	    boardState[i][1] === boardState[i][2] && 
            boardState[i][0] !== '') {
	    return true;
	}
    }

    // Vertical win check
    for (i = 0; i < 3; i++) {
        if (boardState[0][i] === boardState[1][i] &&
            boardState[1][i] === boardState[2][i] &&
            boardState[0][i] !== '') {
            return true;
        }
    }

    // Diagonal win check
    if (boardState[0][0] === boardState[1][1] &&
	boardState[1][1] === boardState[2][2] &&
	boardState[0][0] !== '') {
	  return true;
	}

    if (boardState[0][2] === boardState[1][1] &&
        boardState[1][1] === boardState[2][0] &&
        boardState[0][2] !== '') {
          return true;
        }


  };

  var checkDraw = function() {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
	if (boardState[i][j] === '') {
	  return false;
	}
      }
    }
    return true;
  };


  var handlers = {
    "CreateGame": function (cmd) {
      {
        return [{
          id: cmd.id,
          event: "GameCreated",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp
        }];
      }
    },
    "JoinGame": function (cmd) {
      {
        if (gameCreatedEvent === undefined) {
          return [{
            id: cmd.id,
            event: "GameDoesNotExist",
            userName: cmd.userName,
            timeStamp: cmd.timeStamp
          }];
        }
        return [{
          id: cmd.id,
          event: "GameJoined",
          userName: cmd.userName,
          otherUserName: gameCreatedEvent.userName,
          timeStamp: cmd.timeStamp
        }];
      }
    },
    "MakeMove": function (cmd) {
      {
        var event;
        var x = parseInt(cmd.place[0]);
        var y = parseInt(cmd.place[1]);
        if (boardState[x][y] === "") {
          boardState[x][y] = cmd.player;
          if (checkWin())
            event = "Win" + cmd.player;
          else if (checkDraw())
            event = "Draw";
          else
            event = "Set";
        }
        else {
          event = "IllegalMove";
        }
        return [{
          id: cmd.id,
          event: event,
          player: cmd.player,
          userName: cmd.userName,
          timeStamp: cmd.timeStamp
        }];
      }
    }
  };


  return {
    executeCommand: function (cmd) {
      return handlers[cmd.comm](cmd);
    }
  };
};
