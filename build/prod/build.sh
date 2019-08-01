#!/usr/bin/env bash

echo -en '\n'
echo "Install dependencies..."
echo -en '\n'
docker container run --rm -it --name frontend-prod -v $(pwd)/../..:/app -w /app teracy/angular-cli:1.7.4 npm install

echo -en '\n'
echo "Building production environment..."
echo -en '\n'
docker container run --rm -it --name frontend-prod -v $(pwd)/../..:/app -w /app teracy/angular-cli:1.7.4 ng build --prod --aot --build-optimizer