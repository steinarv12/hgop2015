var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('join game command', function(){

	var given, when, then;

	it('should join game',function(){
		given= [{
			gameId:"1234",
			event:"GameCreated",
			user: {"userName": "Steinar", side: "X"},
			timeStamp: "2015.12.02T11:29:44"
		}];
		when={
			gameId:"1234",
			comm:"JoinGame",
			user: {"userName": "Gunni", side: "O"},
			name:"TheFirstGame",
			timeStamp: "2015.12.02T11:30:50"
		};
		then=[{
			gameId:"1234",
			event:"GameJoined",
			user: {"userName": "Gunni", side: "O"},
			timeStamp: "2015.12.02T11:30:50"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});

	it('should reject joining of a non-existing game',function(){
		given= [];
		when={
			gameId:"1234",
			comm:"JoinGame",
			user: {"userName": "Gunni", side: "O"},
			name:"TheFirstGame",
			timeStamp: "2015.12.02T11:30:55"
		};
		then=[{
			gameId:"1234",
			event:"GameDoesNotExist",
			user: {"userName": "Gunni", side: "O"},
			timeStamp: "2015.12.02T11:30:55"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});
});
