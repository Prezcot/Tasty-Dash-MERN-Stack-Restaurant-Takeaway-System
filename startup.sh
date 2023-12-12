#!/bin/bash

# Install dependencies in the client folder
cd /usr/src/app/client
npm install

# Install dependencies in the server folder
cd /usr/src/app/server
npm install

# Go back to the root directory where docker-compose.yml is located
cd /usr/src/app/

# Run docker-compose up
docker-compose up