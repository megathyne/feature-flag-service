###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:22 AS development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node