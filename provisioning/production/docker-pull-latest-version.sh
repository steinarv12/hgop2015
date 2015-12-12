echo Running revision $2 on port $1

docker kill tictactoe$1
docker rm tictactoe$1
docker pull steinarv12/tictactoe:$2
docker run -p $1:8080 -d --name tictactoe$1 -e "NODE_ENV=production" steinarv12/tictactoe:$2
