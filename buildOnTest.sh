#!/bin/bash

SSHPATH=$1

echo "SSH to Test machine..."
ssh $SSHPATH '
docker stop tic
docker rm tic
docker pull steinarv12/tictactoe:$2
docker run -p 9000:8080 -d --name="tic" -e "NODE_ENV=production" steinarv12/tictactoe:$2
	'

rc=$?
if [[ $rc != 0 ]] ; then
    echo "Failed sending commands over SSH " $rc
    exit $rc
fi

echo "Commands sent"
