var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('Make a move command', function() {
    var given, when, then;

	beforeEach(function(){
		given= [{
			gameId:"1234",
			event: "GameCreated",
			name: "TheFirstGame",
			user: {"userName": "Steinar", side: "X"},
			timeStamp: "2015.12.02T11:29:44"
		}, {
			gameId:"1234",
			event:"GameJoined",
			user: {"userName": "Gunni", side: "O"},
			timeStamp: "2015.12.02T11:30:50"
		}];
	});

    it('should be able to make a move', function() {
		when= {
			gameId: "1234",
			comm: "MakeMove",
			user: {"userName": "Steinar", side: "X"},
			move: { xy: [0,0], side: "X" },
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			gameId: "1234",
			event: "Set",
			move: { xy: [0,0], side: "X" },
			user: {"userName": "Steinar", side: "X"},
			timeStamp: "2015.12.02T11:30:55"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });

    it('Should not be able for a player to make a move twice in a row', function() {
    	given = given.concat([
		{
			gameId: "1234",
			event: "Set",
			user: {"userName": "Steinar", side: "X"},
			move: { xy: [0,0], side: "X" },
			timeStamp: "2015.12.02T11:30:55"
		}]);
		when = {
			gameId: "1234",
			comm: "MakeMove",
			user: {"userName": "Steinar", side: "X"},
			move: { xy: [0,1], side: "X" },
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			gameId: "1234",
			event: "IllegalMove",
			move: { xy: [0,1], side: "X" },
			user: {"userName": "Steinar", side: "X"},
			timeStamp: "2015.12.02T11:30:55"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    })

    it('should not be able to make a move on a taken spot', function() {
		given = given.concat([
		{
			gameId: "1234",
			event: "Set",
			user: {"userName": "Steinar", side: "X"},
			move: { xy: [0,0], side: "X" },
			timeStamp: "2015.12.02T11:30:55"
		}]);
		when = {
			gameId: "1234",
			comm: "MakeMove",
			user: {"userName": "Gunni", side: "O"},
			move: { xy: [0,0], side: "O" },
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			gameId: "1234",
			event: "IllegalMove",
			move: { xy: [0,0], side: "O" },
			user: {"userName": "Gunni", side: "O"},
			timeStamp: "2015.12.02T11:30:55"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });


    it('should be able to win a game horizontal', function () {
		given = given.concat([
		{
			gameId: "1234",
			event: "Set",
			user: {"userName": "Steinar", side: "X"},
			move: { xy: [0,0], side: "X" },
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			user: {"userName": "Gunni", side: "O"},
			move: { xy: [1.0], side: "O" },
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			user: {"userName": "Steinar", side: "X"},
			move: { xy: [0, 1], side: "X" },
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			user: {"userName": "Gunni", side: "O"},
			move: { xy: [1, 1], side: "O" },
			timeStamp: "2015.12.02T11:30:55"
		}]);
		when= {
			gameId: "1234",
			comm: "MakeMove",
			user: {"userName": "Steinar", side: "X"},
			move: { xy: [0, 2], side: "X" },
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			gameId: "1234",
			event: "Won X",
			move: { xy: [0, 2], side: "X" },
			user: {"userName": "Steinar", side: "X"},
			timeStamp: "2015.12.02T11:30:55"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });

    it('should be able to win a game vertical', function () {
		given = given.concat([
		{
			gameId: "1234",
			event:"Set",
			user: {"userName": "Steinar", side: "X"},
			move: { xy: [1, 0], side: "X" },
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			user: {"userName": "Gunni", side: "O"},
			move: { xy: [0, 0], side: "O" },
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event:"Set",
			user: {"userName": "Steinar", side: "X"},
			move: { xy: [1, 1], side: "X" },
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			user: {"userName": "Gunni", side: "O"},
			move: { xy: [0, 1], side: "O" },
			timeStamp: "2015.12.02T11:30:55"
		}]);
		when= {
			gameId: "1234",
			comm: "MakeMove",
			user: {"userName": "Steinar", side: "X"},
			move: { xy: [1, 2], side: "X" },
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			gameId: "1234",
			event: "Won X",
			move: { xy: [1, 2], side: "X" },
			user: {"userName": "Steinar", side: "X"},
			timeStamp: "2015.12.02T11:30:55"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });

    it('should be able to win a game across, top to bottom', function () {
		given = given.concat([
		{
			gameId: "1234",
			event: "Set",
			user: {"userName": "Steinar", side: "X"},
			move: { xy: [0, 0], side: "X" },
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			user: {"userName": "Gunni", side: "O"},
			move: { xy: [1, 0], side: "O" },
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			user: {"userName": "Steinar", side: "X"},
			move: { xy: [1, 1], side: "X" },
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			user: {"userName": "Gunni", side: "O"},
			move: { xy: [2, 0], side: "O" },
			timeStamp: "2015.12.02T11:30:55"
		}]);
		when= {
			gameId: "1234",
			comm: "MakeMove",
			user: {"userName": "Steinar", side: "X"},
			move: { xy: [2, 2], side: "X" },
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			gameId: "1234",
			event: "Won X",
			move: { xy: [2, 2], side: "X" },
			user: {"userName": "Steinar", side: "X"},
			timeStamp: "2015.12.02T11:30:55"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });

    it('should be able to win a game across, bottom to top', function () {
		given = given.concat([
		{
			gameId: "1234",
			event: "Set",
			user: {"userName": "Steinar", side: "X"},
			move: { xy: [2, 0], side: "X" } ,
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			user: {"userName": "Gunni", side: "O"},
			move: { xy: [1, 0], side: "O" },
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			user: {"userName": "Steinar", side: "X"},
			move: { xy: [1, 1], side: "X" },
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			user: {"userName": "Gunni", side: "O"},
			move: { xy: [2, 2], side: "O" },
			timeStamp: "2015.12.02T11:30:55"
		}]);
		when= {
			gameId: "1234",
			comm: "MakeMove",
			user: {"userName": "Steinar", side: "X"},
			move: { xy: [0, 2], side: "X" },
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			gameId: "1234",
			event: "Won X",
			move: { xy: [0, 2], side: "X" },
			user: {"userName": "Steinar", side: "X"},
			timeStamp: "2015.12.02T11:30:55"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });

    it('should be able to tie a game', function () {
		given= [{
			gameId:"1234",
			event:"GameCreated",
			user: {"userName": "Steinar", side: "X"},
			timeStamp: "2015.12.02T11:29:44"
		},
		{
			gameId:"1234",
			event:"GameJoined",
			user: {"userName": "Gunni", side: "O"},
			timeStamp: "2015.12.02T11:30:50"
		},
		{
			gameId: "1234", event: "Set", user: {"userName": "Steinar", side: "X"}, move: { xy: [0,0], side: "X" }, timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234", event: "Set", user: {"userName": "Gunni", side: "O"}, move: { xy: [0,1], side: "O" }, timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234", event: "Set", user: {"userName": "Steinar", side: "X"}, move: { xy: [0,2], side: "X" }, timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234", event: "Set", user: {"userName": "Gunni", side: "O"}, move: { xy: [1,1], side: "O" }, timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234", event: "Set", user: {"userName": "Steinar", side: "X"}, move: { xy: [1,0], side: "X" }, timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234", event: "Set", user: {"userName": "Gunni", side: "O"}, move: { xy: [2,0], side: "O" }, timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234", event: "Set", user: {"userName": "Steinar", side: "X"}, move: { xy: [1,2], side: "X" }, timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234", event: "Set", user: {"userName": "Gunni", side: "O"}, move: { xy: [2,2], side: "O" }, timeStamp: "2015.12.02T11:30:55"
		}];
		when= {
			gameId: "1234",
			comm: "MakeMove",
			user: {"userName": "Steinar", side: "X"},
			move: { xy: [2,1], side: "X" },
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			gameId: "1234",
			event: "Draw",
			move: { xy: [2,1], side: "X" },
			user: {"userName": "Steinar", side: "X"},
			timeStamp: "2015.12.02T11:30:55"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });

});
