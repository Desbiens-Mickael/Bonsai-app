FROM node:16.19-alpine

RUN apk --no-cache add curl
RUN npm i -g pnpm

RUN mkdir /app
WORKDIR /app

COPY package*.json .
COPY pnpm* .
COPY .npmrc .

RUN pnpm i

COPY tsconfig.json .
COPY tsconfig.node.json .
COPY vite.config.ts .
COPY codegen.yml .
COPY .env .

COPY src ./src
COPY public ./public
COPY index.html .

CMD pnpm start