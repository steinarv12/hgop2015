var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('create game command', function(){
    var given, when, then;

    it('should create game',function(){
        given= [];
        when={
          id:"1234",
          comm:"CreateGame",
          userName : "Steinar",
          name:"TheFirstGame",
          timeStamp: "2015.12.02T11:29:44"
        };
        then=[{
          id:"1234",
          event:"GameCreated",
          userName: "Steinar",
          timeStamp: "2015.12.02T11:29:44"
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

  it('should create game with another user another time',function(){
    given= [];
    when={
      id:"12347",
      comm:"CreateGame",
      userName : "Gunni",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T10:29:44"
    };
    then=[{
      id:"12347",
      event:"GameCreated",
      userName: "Gunni",
      timeStamp: "2015.12.02T10:29:44"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});


describe('join game command', function(){

  var given, when, then;

  it('should join game',function(){
    given= [{
      id:"1234",
      event:"GameCreated",
      userName: "Steinar",
      timeStamp: "2015.12.02T11:29:44"
    }];
    when={
      id:"12345",
      comm:"JoinGame",
      userName : "Gunni",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:30:50"
    };
    then=[{
      id:"12345",
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
      id:"12345",
      comm:"JoinGame",
      userName : "Gunni",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:30:55"
    };
    then=[{
      id:"12345",
      event:"GameDoesNotExist",
      userName: "Gunni",
      timeStamp: "2015.12.02T11:30:55"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});

// f
describe('Make a move command', function() {
    var given, when, then;

    it('should be able to make a move', function() {
      given= [{
        id:"1234",
        event:"GameCreated",
        userName: "Steinar",
        timeStamp: "2015.12.02T11:29:44"
      },
      {
        id:"12345",
        event:"GameJoined",
        userName: "Gunni",
        otherUserName: "Steinar",
        timeStamp: "2015.12.02T11:30:50"
      }];
      when= {
	id: "12345",
	comm: "MakeMove",
	player: "X",
	userName: "Steinar",
	place: [0, 0],
	timeStamp: "2015.12.02T11:30:55"
      };
      then= [{
	id: "12345",
	event: "Set",
    place: [0, 0],
	player: "X",
	userName: "Steinar",
	timeStamp: "2015.12.02T11:30:55"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });

    it('should be able to win a game', function () {
      given= [{
        id:"1234",
        event:"GameCreated",
        userName: "Steinar",
        timeStamp: "2015.12.02T11:29:44"
      },
      {
        id:"12345",
        event:"GameJoined",
        userName: "Gunni",
        otherUserName: "Steinar",
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id: "12345",
        comm: "MakeMove",
        player: "X",
        userName: "Steinar",
        place: [0, 0],
        timeStamp: "2015.12.02T11:30:55"
      },
      {
        id: "12345",
        comm: "MakeMove",
        player: "X",
        userName: "Steinar",
        place: [0, 1],
        timeStamp: "2015.12.02T11:30:55"
      }];
      when= {
        id: "12345",
        comm: "MakeMove",
        player: "X",
        userName: "Steinar",
        place: [0, 2],
        timeStamp: "2015.12.02T11:30:55"
      };
      then= [{
        id: "12345",
        event: "Won X",
        place: [0, 2],
        player: "X",
        userName: "Steinar",
        timeStamp: "2015.12.02T11:30:55"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });

});
