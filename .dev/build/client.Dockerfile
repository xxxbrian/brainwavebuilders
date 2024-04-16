FROM node:20
RUN mkdir -p /app/client
COPY ./client /app/client
WORKDIR /app/client
RUN yarn install --frozen-lockfile --production
RUN yarn build

ENTRYPOINT [ "yarn", "start" ]
