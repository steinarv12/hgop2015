#!/bin/bash

echo "SSH to Test machine..."
ssh 192.168.56.77 '
docker stop tic
docker rm tic
docker pull steinarv12/tictactoe:latest
docker run -p 9000:8080 -d --name="tic" -e "NODE_ENV=test" steinarv12/tictactoe

'
echo "Commands sent"
