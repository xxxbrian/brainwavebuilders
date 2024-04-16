FROM nginx:latest
COPY .dev/nginx/default.conf /etc/nginx/conf.d/default.conf
