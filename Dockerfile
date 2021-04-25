FROM node:lts-alpine3.13 as build

WORKDIR /app

COPY package*.json ./

COPY tsconfig.json ./

COPY webpack.config.js ./

RUN npm install

COPY src ./src

RUN npm run build

FROM nginx

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html/