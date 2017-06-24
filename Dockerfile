FROM node:8.1.0
MAINTAINER Napoleon team "napoleon@napoleon.cc"

WORKDIR /root

# Install global dependencies
RUN apt-get update && apt-get install libelf1 && yarn global add pm2

# Install dependencies
ADD package.json /root/package.json
ADD yarn.lock /root/yarn.lock
RUN yarn install --pure-lockfile --ignore-optional

# Inject code in the container
ADD . /root

# Build the locale files
RUN yarn run init-locale

# Build and run the app
RUN yarn run next build
CMD ["pm2-docker", "/root/server.js"]
