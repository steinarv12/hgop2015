#!/bin/bash

SSHPATH=$1

if [ $# -ne 1 ]; then
    echo $0: usage: myscript sshpath
    exit 1
fi

# If name does not exist on test, then what?

echo "SSH to Test machine..."
ssh $SSHPATH 'docker restart tic'
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Failed sending commands over SSH " $rc
    exit $rc
fi
