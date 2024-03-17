FROM node:21-alpine

WORKDIR /app

COPY package.json yarn.lock* ./

RUN npm install

COPY . .

RUN npm run build
RUN ls -la

CMD [ "npm", "run", "start:dev" ]
