FROM node:15-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./babel.config.json ./

RUN npm install

COPY ./public ./public
COPY ./server ./server
COPY ./client ./client

EXPOSE 6002

CMD ["npm", "run", "ssr"]