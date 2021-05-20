FROM node:15

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY ./server ./server

EXPOSE 5002

CMD ["npm", "run", "dev"]