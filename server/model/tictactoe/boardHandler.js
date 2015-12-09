module.exports = function(){
    return {

        previousCmd: null,
        previousMark: "O",

    	board:  [['','',''],
                 ['','',''],
                 ['','','']],

    	makeMove: function (cmd) {
            var event;
            var row = parseInt(cmd.place[0]);
            var col = parseInt(cmd.place[1]);
            if (this.previousCmd !== null && this.previousCmd.userName === cmd.userName) {
                event = "IllegalMove";
            }
            else if (this.board[row][col] === "") {
                this.board[row][col] = cmd.userName;
                if (this.checkWin())
                    event = "Won " + cmd.userName;
                else if (this.checkDraw())
                    event = "Draw";
                else
                    event = "Set";
            }
            else {
                event = "IllegalMove";
            }
            this.previousCmd = cmd;
            return [{
                gameId: cmd.gameId,
                event: event,
                place: cmd.place,
                userName: cmd.userName,
                timeStamp: cmd.timeStamp
            }];
        },


    	checkDraw: function() {
    	    for (var i = 0; i < 3; i++) {
          		for (var j = 0; j < 3; j++) {
            	    if (this.board[i][j] === '') {
              		return false;
            	    }
          		}
        	}
            return true;
      	},


        checkWin: function () {
            // Horizontal win check
            for (var i = 0; i < 3; i++) {
                if (this.board[i][0] === this.board[i][1] && 
                    this.board[i][1] === this.board[i][2] && 
                    this.board[i][0] !== '') {
                    return true;
                }
            }

            // Vertical win check
            for (i = 0; i < 3; i++) {
                if (this.board[0][i] === this.board[1][i] &&
                    this.board[1][i] === this.board[2][i] &&
                    this.board[0][i] !== '') {
                    return true;
                }
            }

            // Diagonal win check
            if (this.board[0][0] === this.board[1][1] &&
        	this.board[1][1] === this.board[2][2] &&
        	this.board[0][0] !== '') {
                return true;
        	}

            if (this.board[0][2] === this.board[1][1] &&
                this.board[1][1] === this.board[2][0] &&
                this.board[0][2] !== '') {
                    return true;
            }

        }
    };
};
