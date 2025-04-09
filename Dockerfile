FROM node:lts-alpine AS base
WORKDIR /usr/graphql-calc
COPY package*.json .

FROM base AS prod
ENV NODE_ENV=production
RUN npm install \
    && npm install typescript -g
COPY . .
CMD npx graphql-codegen && npm start

FROM base AS ci
RUN npm ci 
COPY . .
CMD npx graphql-codegen && npm start
