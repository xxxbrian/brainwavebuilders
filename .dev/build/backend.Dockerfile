FROM node:20
RUN mkdir -p /app/server
COPY ./server /app/server
WORKDIR /app/server
RUN yarn install
RUN yarn build
WORKDIR /app/server/dist
COPY .dev/build/server.entrypoint.sh ./entrypoint.sh

ENTRYPOINT [ "bash", "-c", "./entrypoint.sh" ]
