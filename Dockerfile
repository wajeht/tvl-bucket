FROM node:alpine
RUN apk add  --no-cache ffmpeg

WORKDIR /usr/src/app

COPY package.json package-lock*.json ./
COPY tsconfig.json ./

RUN npm install npm@latest

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "start"]
