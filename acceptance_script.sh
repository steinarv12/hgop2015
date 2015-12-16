#!/bin/bash
./buildOnRemote.sh $1 $2
grunt mochaTest:acceptance
