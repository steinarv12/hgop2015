var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('Make a move command', function() {
    var given, when, then;

	beforeEach(function(){
		given= [{
			id:"1234",
			event: "GameCreated",
			name: "TheFirstGame",
			userName: "Steinar",
			timeStamp: "2015.12.02T11:29:44"
		}, {
			id:"1234",
			event:"GameJoined",
			userName: "Gunni",
			otherUserName: "Steinar",
			timeStamp: "2015.12.02T11:30:50"
		}];
	});

    it('should be able to make a move', function() {
		when= {
			id: "1234",
			comm: "MakeMove",
			player: "X",
			userName: "Steinar",
			place: [0, 0],
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			id: "1234",
			event: "Set",
			place: [0, 0],
			player: "X",
			userName: "Steinar",
			timeStamp: "2015.12.02T11:30:55"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });

    it('should not be able to make a move on a taken spot', function() {
		given = given.concat([
		{
			id: "1234",
			event: "Set",
			player: "X",
			userName: "Steinar",
			place: [0, 0],
			timeStamp: "2015.12.02T11:30:55"
		}]);
		when= {
			id: "1234",
			comm: "MakeMove",
			player: "O",
			userName: "Gunni",
			place: [0, 0],
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			id: "1234",
			event: "IllegalMove",
			place: [0, 0],
			player: "O",
			userName: "Gunni",
			timeStamp: "2015.12.02T11:30:55"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
		console.log(actualEvents);
		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });


    it('should be able to win a game horizontal', function () {
		given = given.concat([
		{
			id: "1234",
			event: "Set",
			player: "X",
			userName: "Steinar",
			place: [0, 0],
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			id: "1234",
			event: "Set",
			player: "X",
			userName: "Steinar",
			place: [0, 1],
			timeStamp: "2015.12.02T11:30:55"
		}]);
		when= {
			id: "1234",
			comm: "MakeMove",
			player: "X",
			userName: "Steinar",
			place: [0, 2],
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			id: "1234",
			event: "Won X",
			place: [0, 2],
			player: "X",
			userName: "Steinar",
			timeStamp: "2015.12.02T11:30:55"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });

    it('should be able to win a game vertical', function () {
		given = given.concat([
		{
			id: "1234",
			event:"Set",
			player: "X",
			userName: "Steinar",
			place: [1, 0],
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			id: "1234",
			event:"Set",
			player: "X",
			userName: "Steinar",
			place: [1, 1],
			timeStamp: "2015.12.02T11:30:55"
		}]);
		when= {
			id: "1234",
			comm: "MakeMove",
			player: "X",
			userName: "Steinar",
			place: [1, 2],
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			id: "1234",
			event: "Won X",
			place: [1, 2],
			player: "X",
			userName: "Steinar",
			timeStamp: "2015.12.02T11:30:55"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });

    it('should be able to win a game across, top to bottom', function () {
		given= [{
			id:"1234",
			event:"GameCreated",
			userName: "Steinar",
			timeStamp: "2015.12.02T11:29:44"
		},
		{
			id:"1234",
			event:"GameJoined",
			userName: "Gunni",
			otherUserName: "Steinar",
			timeStamp: "2015.12.02T11:30:50"
		},
		{
			id: "1234",
			event: "Set",
			player: "X",
			userName: "Steinar",
			place: [0, 0],
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			id: "1234",
			event: "Set",
			player: "X",
			userName: "Steinar",
			place: [1, 1],
			timeStamp: "2015.12.02T11:30:55"
		}];
		when= {
			id: "1234",
			comm: "MakeMove",
			player: "X",
			userName: "Steinar",
			place: [2, 2],
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			id: "1234",
			event: "Won X",
			place: [2, 2],
			player: "X",
			userName: "Steinar",
			timeStamp: "2015.12.02T11:30:55"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });

    it('should be able to win a game across, bottom to top', function () {
		given= [{
			id:"1234",
			event:"GameCreated",
			userName: "Steinar",
			timeStamp: "2015.12.02T11:29:44"
		},
		{
			id:"1234",
			event:"GameJoined",
			userName: "Gunni",
			otherUserName: "Steinar",
			timeStamp: "2015.12.02T11:30:50"
		},
		{
			id: "1234",
			event: "Set",
			player: "X",
			userName: "Steinar",
			place: [2, 0],
			timeStamp: "2015.12.02T11:30:55"
		},
		{
			id: "1234",
			event: "Set",
			player: "X",
			userName: "Steinar",
			place: [1, 1],
			timeStamp: "2015.12.02T11:30:55"
		}];
		when= {
			id: "1234",
			comm: "MakeMove",
			player: "X",
			userName: "Steinar",
			place: [0, 2],
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			id: "1234",
			event: "Won X",
			place: [0, 2],
			player: "X",
			userName: "Steinar",
			timeStamp: "2015.12.02T11:30:55"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });

    it('should be able to tie a game', function () {
		given= [{
			id:"1234",
			event:"GameCreated",
			userName: "Steinar",
			timeStamp: "2015.12.02T11:29:44"
		},
		{
			id:"1234",
			event:"GameJoined",
			userName: "Gunni",
			otherUserName: "Steinar",
			timeStamp: "2015.12.02T11:30:50"
		},
		{
			id: "1234", event: "Set", player: "X", userName: "Steinar", place: [0, 0], timeStamp: "2015.12.02T11:30:55"
		},
		{
			id: "1234", event: "Set", player: "O", userName: "Gunni", place: [0, 1], timeStamp: "2015.12.02T11:30:55"
		},
		{
			id: "1234", event: "Set", player: "X", userName: "Steinar", place: [0, 2], timeStamp: "2015.12.02T11:30:55"
		},
		{
			id: "1234", event: "Set", player: "O", userName: "Gunni", place: [1, 1], timeStamp: "2015.12.02T11:30:55"
		},
		{
			id: "1234", event: "Set", player: "X", userName: "Steinar", place: [1, 0], timeStamp: "2015.12.02T11:30:55"
		},
		{
			id: "1234", event: "Set", player: "O", userName: "Gunni", place: [2, 0], timeStamp: "2015.12.02T11:30:55"
		},
		{
			id: "1234", event: "Set", player: "X", userName: "Steinar", place: [1, 2], timeStamp: "2015.12.02T11:30:55"
		},
		{
			id: "1234", event: "Set", player: "O", userName: "Gunni", place: [2, 2], timeStamp: "2015.12.02T11:30:55"
		}];
		when= {
			id: "1234",
			comm: "MakeMove",
			player: "X",
			userName: "Steinar",
			place: [2, 1],
			timeStamp: "2015.12.02T11:30:55"
		};
		then= [{
			id: "1234",
			event: "Draw",
			place: [2, 1],
			player: "X",
			userName: "Steinar",
			timeStamp: "2015.12.02T11:30:55"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });

});