#!/bin/bash

SSHPATH=$1

if [ $# -ne 1 ]; then
    echo $0: usage: myscript sshpath
    exit 1
fi

echo "SSH to Test machine..."
ssh $SSHPATH '
docker stop tic
docker rm tic
docker pull steinarv12/tictactoe:latest
docker run -p 9000:8080 -d --name="tic" -e "NODE_ENV=test" steinarv12/tictactoe
	'
echo "Commands sent"
