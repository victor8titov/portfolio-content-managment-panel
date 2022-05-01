FROM node:16.15-alpine3.14 as builder

WORKDIR /app

COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.13.7-alpine

RUN apk update && apk add vim bash

RUN rm /usr/share/nginx/html/*

COPY default.conf /etc/nginx/conf.d/

RUN cat /etc/nginx/conf.d/default.conf

COPY --from=builder /app/public/. /usr/share/nginx/html/
COPY --from=builder /app/dist/. /usr/share/nginx/html/

EXPOSE 81
