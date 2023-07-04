FROM node:16.19-alpine

RUN apk --no-cache add curl

RUN mkdir /app
WORKDIR /app

COPY package*.json .
COPY .npmrc .

RUN npm i

COPY tsconfig.json .
COPY tsconfig.node.json .
COPY vite.config.ts .
COPY codegen.yml .
COPY .env .

COPY src ./src
COPY public ./public
COPY index.html .

CMD npm start