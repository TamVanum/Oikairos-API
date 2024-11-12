FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
EXPOSE 1883
EXPOSE 8888

ENV NODE_ENV production

CMD ["npm", "start"]
