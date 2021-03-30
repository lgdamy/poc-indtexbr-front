### STAGE 1: Build ###
FROM node:12.16-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g @angular/cli@9.1.12
COPY . .

ARG PROFILE
##ENV PROFILE jenkins
ENV PROFILE prod

RUN echo "Environment: ${PROFILE}"
RUN npm run build-${PROFILE}

ARG NODE_ENV
##ENV NODE_ENV jenkins
ENV NODE_ENV prod

##CMD npm run start-jenkins
CMD npm run start-prod