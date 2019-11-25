FROM node:12.7-alpine as build-stage
WORKDIR /home/app/
COPY /package.json ./
RUN npm install
COPY babel.config.js ./
COPY .env ./
COPY src/ ./src
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /home/app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
