FROM node:12.7-alpine
WORKDIR /home/app/
COPY /package.json ./
RUN npm install
COPY babel.config.js ./
COPY .env ./
COPY src/ ./src
EXPOSE 8080
ENTRYPOINT [ "npm", "run", "serve" ]
