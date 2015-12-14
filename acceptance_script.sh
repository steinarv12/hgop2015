#!/bin/bash
./restartTest.sh $1
grunt mochaTest:acceptance
