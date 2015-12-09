module.exports = function tictactoeCommandHandler(events) {

    var boardHandler = require('./boardHandler')();

    var gameCreatedEvent = events[0];

    var handlers = {
        "CreateGame": function (cmd) {
            {
                return [{
                    gameId: cmd.gameId,
                    event: "GameCreated",
                    name: cmd.name,
                    userName: cmd.userName,
                    timeStamp: cmd.timeStamp
                }];


            }
        },
        "JoinGame": function (cmd) {
            {
                if (gameCreatedEvent === undefined) {
                    return [{
                        gameId: cmd.gameId,
                        event: "GameDoesNotExist",
                        userName: cmd.userName,
                        timeStamp: cmd.timeStamp
                    }];
                }
                return [{
                    gameId: cmd.gameId,
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

    for (var i = 0; i < events.length; i++) {
        if (events[i].event === "Set") {
            boardHandler.makeMove(events[i]);
        }
    }

    return {
        executeCommand: function (cmd) {
            return handlers[cmd.comm](cmd);
        }
    };
};
