### STAGE 1: Build ###
FROM node:12.8-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g @angular/cli@8.3.19
COPY . .

ARG PROFILE
ENV PROFILE jenkins

RUN echo "Environment: ${PROFILE}"
RUN npm run build-${PROFILE}

ARG NODE_ENV
ENV NODE_ENV jenkins

CMD npm run start-jenkins
