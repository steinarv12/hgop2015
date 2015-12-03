module.exports = {

	board:  [['','',''],
                 ['','',''],
                 ['','','']],


	makeMove: function (event) {

	checkDraw: function() {
	    for (var i = 0; i < 3; i++) {
      		for (var j = 0; j < 3; j++) {
        	    if (boardState[i][j] === '') {
          		return false;
        	    }
      		}
    	    }
    	    return true;
  	};


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
};
