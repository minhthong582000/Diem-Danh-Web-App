FROM node:13-slim as builder

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 8082
CMD ["npm","start"]