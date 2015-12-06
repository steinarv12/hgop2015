#!/bin/bash

SSHPATH=$1

if [ $# -ne 1 ]; then
    echo $0: usage: myscript sshpath
    exit 1
fi

# Script on test machine and run it instead?
# If name does not exist on test, then what?

echo "SSH to Test machine..."
ssh $SSHPATH '
docker stop tic
docker rm tic
docker pull steinarv12/tictactoe:latest
docker run -p 9000:8080 -d --name="tic" -e "NODE_ENV=test" steinarv12/tictactoe
	'
echo "Commands sent"
