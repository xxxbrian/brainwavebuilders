FROM node:21-bullseye
VOLUME /app

RUN mkdir -p /cache
WORKDIR /cache

RUN yarn global add commitizen
RUN commitizen init cz-conventional-changelog --yarn --dev --exact

WORKDIR /app
