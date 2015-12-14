var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('create game command', function(){

    var given, when, then;

    it('should create game',function(){
        given= [];
        when={
            gameId: "999",
            comm: "CreateGame",
            userName : "Steinar",
            name: "TestGame",
            timeStamp: "2015.12.02T10:29:44"
        };
        then=[{
            gameId: "999",
            event: "GameCreated",
            name: "TestGame",
            userName: "Steinar",
            timeStamp: "2015.12.02T10:29:44"
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('should create game with another user another time',function(){
        given= [];
        when={
            gameId: "999",
            comm: "CreateGame",
            userName : "Gunni",
            name: "TestGame",
            timeStamp: "2015.12.02T10:29:44"
        };
        then=[{
            gameId: "999",
            event: "GameCreated",
            name: "TestGame",
            userName: "Gunni",
            timeStamp: "2015.12.02T10:29:44"
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
