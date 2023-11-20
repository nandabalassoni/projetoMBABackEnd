FROM mongo:latest

WORKDIR /usr/src/app

COPY package*.json index.js .env . ./

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]
