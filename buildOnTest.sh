#!/bin/bash

SSHPATH=$1
LATESTGIT=$2

if [ $# -ne 1 ]; then
    echo $0: usage: myscript sshpath
    exit 1
fi

echo "SSH to Test machine..."
ssh $SSHPATH '
docker stop tic
docker rm tic
docker pull steinarv12/tictactoe:$2
docker run -p 9000:8080 -d --name="tic" -e "NODE_ENV=production" steinarv12/tictactoe
	'

rc=$?
if [[ $rc != 0 ]] ; then
    echo "Failed sending commands over SSH " $rc
    exit $rc
fi

echo "Commands sent"
