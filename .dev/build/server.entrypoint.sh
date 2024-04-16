#!/bin/bash

echo Launching server at $(pwd)...
echo Frontend is available at $FRONTEND_ADDRESS
echo Binding to port $BIND_PORT.

set -ex

# Migrate the database
yarn migrate

# Launch the server
node --enable-source-maps server.js
