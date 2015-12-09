var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('join game command', function(){

	var given, when, then;

	it('should join game',function(){
		given= [{
			gameId:"1234",
			event:"GameCreated",
			userName: "Steinar",
			timeStamp: "2015.12.02T11:29:44"
		}];
		when={
			gameId:"1234",
			comm:"JoinGame",
			userName : "Gunni",
			name:"TheFirstGame",
			timeStamp: "2015.12.02T11:30:50"
		};
		then=[{
			gameId:"1234",
			event:"GameJoined",
			userName: "Gunni",
			otherUserName: "Steinar",
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
			userName : "Gunni",
			name:"TheFirstGame",
			timeStamp: "2015.12.02T11:30:55"
		};
		then=[{
			gameId:"1234",
			event:"GameDoesNotExist",
			userName: "Gunni",
			timeStamp: "2015.12.02T11:30:55"
		}];

		var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});
});