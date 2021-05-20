FROM node:15-alpine as build

WORKDIR /app

COPY . .

RUN npm install && npm run build


FROM nginx:stable-alpine

COPY --from=build /app/dist /var/www/my-site
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]