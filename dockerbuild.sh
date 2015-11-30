#!/bin/bash

echo Cleaning...
rm -rf ./dist

echo Building app
grunt
rc=$?; if [[ $rc != 0 ]]; then echo "Grunt failed" && exit $rc; fi

cp ./Dockerfile ./dist/
rc=$?; if [[ $rc != 0 ]]; then echo "CP failed" && exit $rc; fi

cd dist
npm install --production
rc=$?; if [[ $rc != 0 ]]; then echo "NPM install failed" && exit $rc; fi

echo Building docker image
docker build -t steinarv12/tictactoe .
rc=$?; if [[ $rc != 0 ]]; then echo "Docker build failed" && exit $rc; fi

echo "Done"
