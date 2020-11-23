FROM node:alpine

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "run", "develop"]