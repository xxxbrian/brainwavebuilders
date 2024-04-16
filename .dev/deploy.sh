#!/bin/bash

set -ex

cd $(dirname $0)/../
docker compose -f docker-compose.deploy.yaml pull
docker compose -f docker-compose.deploy.yaml up -d
