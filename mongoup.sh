#!/bin/sh

docker run --rm -d --name mongodb -p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=mongo -e MONGO_INITDB_ROOT_PASSWORD=passwd  mongo