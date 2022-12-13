FROM node:10-alpine

WORKDIR /home/node/app

COPY . /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "index.js" ]
