FROM node:20-slim

# Set the working directory inside the container
WORKDIR /usr/src/app/server


COPY package*.json ./


RUN npm install

COPY . .

ENV PORT=5000

EXPOSE 5000

CMD ["npm","start"]
