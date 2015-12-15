#!/bin/bash
./buildOnTest.sh $1 $2
./restartTest.sh $1
grunt mochaTest:load
