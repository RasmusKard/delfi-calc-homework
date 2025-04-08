FROM node:lts-alpine as base
WORKDIR /usr/graphql-calc
COPY package*.json .

FROM base as prod
ENV NODE_ENV=production
RUN npm install \
    && npm install typescript -g
COPY . .
CMD npx graphql-codegen && npm start

FROM base as dev
RUN npm install \
    && npm install tsx -g
COPY . .
CMD npm run devStart

