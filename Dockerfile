FROM node:21.7.0-slim

WORKDIR /app

COPY . .

RUN npm install

RUN npm run populate

CMD ["npm", "run", "start"]