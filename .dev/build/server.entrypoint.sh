#!/bin/bash

echo Launching server at ${pwd}...
set -ex

# Migrate the database
yarn migrate

# Launch the server
node --enable-source-maps server.js
