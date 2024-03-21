FROM node:21.7.0-slim

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "start"]