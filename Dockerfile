FROM node:lts-alpine3.13

WORKDIR /app

COPY package*.json ./

COPY tsconfig.json ./

RUN yarn install

COPY . .

RUN yarn build

CMD ["node", "./server/index.js"]
