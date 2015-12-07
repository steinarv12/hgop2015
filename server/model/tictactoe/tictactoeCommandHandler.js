module.exports = function tictactoeCommandHandler(events) {

    var boardHandler = require('./boardHandler')();

    var gameCreatedEvent = events[0];

    var handlers = {
        "CreateGame": function (cmd) {
            {
                return [{
                    id: cmd.id,
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

    for (var i = 0; i < events.length; i++) {
        if (events[i].event === "Set") {
            //handlers["MakeMove"](events[i]);
            boardHandler.makeMove(events[i]);
        }
    };

    return {
        executeCommand: function (cmd) {
            return handlers[cmd.comm](cmd);
        }
    };
};
