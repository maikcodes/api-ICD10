FROM node:21.7.0-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

CMD ["npm", "run", "start"]