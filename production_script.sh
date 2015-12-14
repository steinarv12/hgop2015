#!/bin/bash

ssh $1 '
docker stop tic
docker rm tic
docker run -p 9000:8080 -d --name tic -e "NODE_ENV=production" steinarv12/tictactoe:$2
'
