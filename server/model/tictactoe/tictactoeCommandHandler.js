module.exports = function tictactoeCommandHandler(events) {

    var boardHandler = require('./boardHandler')();

    // Store the event that an illegal move was made due to
    // the same player trying to play 2 or more consecutive plays?

    var gameCreatedEvent = events[0];
    for (var i = 0; i < events.length; i++) {
        if (events[i].event === "Set") {
            boardHandler.makeMove(events[i]);
        }
    };

    var handlers = {
        "CreateGame": function (cmd) {
            {
                return [{
                    id: cmd.id,
                    event: "GameCreated",
                    userName: cmd.userName,
                    timeStamp: cmd.timeStamp
                }];
            }
        },
        "JoinGame": function (cmd) {
            {
                if (gameCreatedEvent === undefined) {
                    return [{
                        id: cmd.id,
                        event: "GameDoesNotExist",
                        userName: cmd.userName,
                        timeStamp: cmd.timeStamp
                    }];
                }
                return [{
                    id: cmd.id,
                    event: "GameJoined",
                    userName: cmd.userName,
                    otherUserName: gameCreatedEvent.userName,
                    timeStamp: cmd.timeStamp
                }];
            }
        },
        "MakeMove": function (cmd) {
            {
                return boardHandler.makeMove(cmd);
            }
        }
    };


    return {
        executeCommand: function (cmd) {
            return handlers[cmd.comm](cmd);
        }
    };
};