FROM nginx
RUN mkdir /app
COPY /home/app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
