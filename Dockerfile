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
RUN npm ci \
    && npm install typescript -g
COPY . .
CMD npx graphql-codegen && npm start

FROM base AS dev
RUN npm install \
    && npm install tsx -g
COPY . .
CMD ["npm","run","devStart"]

