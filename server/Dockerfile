FROM node:20-slim

WORKDIR /app

COPY pacake*.json ./

RUN npm install

COPY . .

ENV PORT=5000

EXPOSE 5000

CMD ["npm","start"]
