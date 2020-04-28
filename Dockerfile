FROM nginx
RUN mkdir /app
ADD dist /app
COPY nginx.conf /etc/nginx/nginx.conf

COPY runtimeconfig.sh /
RUN chmod +x /runtimeconfig.sh

CMD [ "/runtimeconfig.sh" ]
EXPOSE 8080
