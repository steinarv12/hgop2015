#!/bin/bash

ssh $1 "
docker stop tic
docker rm tic
docker pull steinarv12/tictactoe:$2
docker run -p 9000:8080 -d --name tic -e "NODE_ENV=production" steinarv12/tictactoe:$2
"
