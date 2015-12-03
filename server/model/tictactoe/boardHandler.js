module.exports = function(){
    return {

	board:  [['','',''],
             ['','',''],
             ['','','']],

	makeMove: function (cmd) {
        var event;
        var x = parseInt(cmd.place[0]);
        var y = parseInt(cmd.place[1]);
        if (board[x][y] === "") {
            board[x][y] = cmd.player;
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
    },


	checkDraw: function() {
	    for (var i = 0; i < 3; i++) {
      		for (var j = 0; j < 3; j++) {
        	    if (board[i][j] === '') {
          		return false;
        	    }
      		}
    	}
        return true;
  	},


    checkWin: function () {
        // Horizontal win check
        for (var i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && 
                board[i][1] === board[i][2] && 
                    board[i][0] !== '') {
                return true;
            }
        }

        // Vertical win check
        for (i = 0; i < 3; i++) {
            if (board[0][i] === board[1][i] &&
                board[1][i] === board[2][i] &&
                board[0][i] !== '') {
                return true;
            }
        }

        // Diagonal win check
        if (board[0][0] === board[1][1] &&
    	board[1][1] === board[2][2] &&
    	board[0][0] !== '') {
    	  return true;
    	}

        if (board[0][2] === board[1][1] &&
            board[1][1] === board[2][0] &&
            board[0][2] !== '') {
              return true;
        }

    }
    };
};
