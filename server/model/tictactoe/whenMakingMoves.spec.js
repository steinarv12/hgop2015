var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('Make a move command', function() {
    var given, when, then;

	beforeEach(function(){
		given= [{
			gameId:"1234",
			event: "GameCreated",
			name: "TheFirstGame",
			userName: "Steinar",
			timeStamp: "2015.12.02T11:29:44"
		}, {
			gameId:"1234",
			event:"GameJoined",
			userName: "Gunni",
			otherUserName: "Steinar",
			timeStamp: "2015.12.02T11:30:50"
		}];
	});

    it('should be able to make a move', function() {
		when= {
			gameId: "1234",
			comm: "MakeMove",
			userName: "Steinar",
			place: [0, 0],
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			gameId: "1234",
			event: "Set",
			place: [0, 0],
			userName: "Steinar",
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
			userName: "Steinar",
			place: [0, 0],
			timeStamp: "2015.12.02T11:30:55"
		}]);
		when = {
			gameId: "1234",
			comm: "MakeMove",
			userName: "Steinar",
			place: [0, 1],
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			gameId: "1234",
			event: "IllegalMove",
			place: [0, 1],
			userName: "Steinar",
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
			userName: "Steinar",
			place: [0, 0],
			timeStamp: "2015.12.02T11:30:55"
		}]);
		when = {
			gameId: "1234",
			comm: "MakeMove",
			userName: "Gunni",
			place: [0, 0],
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			gameId: "1234",
			event: "IllegalMove",
			place: [0, 0],
			userName: "Gunni",
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
			userName: "Steinar",
			place: [0, 0],
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			userName: "Gunni",
			place: [1, 0],
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			userName: "Steinar",
			place: [0, 1],
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			userName: "Gunni",
			place: [1, 1],
			timeStamp: "2015.12.02T11:30:55"
		}]);
		when= {
			gameId: "1234",
			comm: "MakeMove",
			userName: "Steinar",
			place: [0, 2],
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			gameId: "1234",
			event: "Won Steinar",
			place: [0, 2],
			userName: "Steinar",
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
			userName: "Steinar",
			place: [1, 0],
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			userName: "Gunni",
			place: [0, 0],
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event:"Set",
			userName: "Steinar",
			place: [1, 1],
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			userName: "Gunni",
			place: [0, 1],
			timeStamp: "2015.12.02T11:30:55"
		}]);
		when= {
			gameId: "1234",
			comm: "MakeMove",
			userName: "Steinar",
			place: [1, 2],
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			gameId: "1234",
			event: "Won Steinar",
			place: [1, 2],
			userName: "Steinar",
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
			userName: "Steinar",
			place: [0, 0],
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			userName: "Gunni",
			place: [1, 0],
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			userName: "Steinar",
			place: [1, 1],
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			userName: "Gunni",
			place: [2, 0],
			timeStamp: "2015.12.02T11:30:55"
		}]);
		when= {
			gameId: "1234",
			comm: "MakeMove",
			userName: "Steinar",
			place: [2, 2],
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			gameId: "1234",
			event: "Won Steinar",
			place: [2, 2],
			userName: "Steinar",
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
			userName: "Steinar",
			place: [2, 0],
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			userName: "Gunni",
			place: [1, 0],
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			userName: "Steinar",
			place: [1, 1],
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234",
			event: "Set",
			userName: "Gunni",
			place: [2, 2],
			timeStamp: "2015.12.02T11:30:55"
		}]);
		when= {
			gameId: "1234",
			comm: "MakeMove",
			userName: "Steinar",
			place: [0, 2],
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			gameId: "1234",
			event: "Won Steinar",
			place: [0, 2],
			userName: "Steinar",
			timeStamp: "2015.12.02T11:30:55"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });

    it('should be able to tie a game', function () {
		given= [{
			gameId:"1234",
			event:"GameCreated",
			userName: "Steinar",
			timeStamp: "2015.12.02T11:29:44"
		},
		{
			gameId:"1234",
			event:"GameJoined",
			userName: "Gunni",
			otherUserName: "Steinar",
			timeStamp: "2015.12.02T11:30:50"
		},
		{
			gameId: "1234", event: "Set", userName: "Steinar", place: [0, 0], timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234", event: "Set", userName: "Gunni", place: [0, 1], timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234", event: "Set", userName: "Steinar", place: [0, 2], timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234", event: "Set", userName: "Gunni", place: [1, 1], timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234", event: "Set", userName: "Steinar", place: [1, 0], timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234", event: "Set", userName: "Gunni", place: [2, 0], timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234", event: "Set", userName: "Steinar", place: [1, 2], timeStamp: "2015.12.02T11:30:55"
		},
		{
			gameId: "1234", event: "Set", userName: "Gunni", place: [2, 2], timeStamp: "2015.12.02T11:30:55"
		}];
		when= {
			gameId: "1234",
			comm: "MakeMove",
			userName: "Steinar",
			place: [2, 1],
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			gameId: "1234",
			event: "Draw",
			place: [2, 1],
			userName: "Steinar",
			timeStamp: "2015.12.02T11:30:55"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });

});