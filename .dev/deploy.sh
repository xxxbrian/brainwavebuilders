#!/bin/bash

set -ex

cd $(dirname $0)/../
env $(cat .dev/secrets/production.env) docker compose -f docker-compose.deploy.yaml pull
env $(cat .dev/secrets/production.env) docker compose -f docker-compose.deploy.yaml up -d
