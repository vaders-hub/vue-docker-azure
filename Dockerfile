FROM node:14.16.1 as builder

WORKDIR /usr/src/app

COPY front/ ./front/

RUN cd front && rm -rf node_modules/

RUN cd front && npm install && npm run build

FROM nginx:alpine as production-build

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /usr/src/app/front/dist /usr/share/nginx/html

EXPOSE 8081

ENTRYPOINT ["nginx", "-g", "daemon off;"]

# docker build -t vader/vue-app .
# docker run -it -p 8081:8081 --rm --name vue-docker-app vader/vue-app
# az acr update -n vueApp --admin-enabled true
# az acr build --image vue-docker/azure:v2 --registry vueApp --file Dockerfile .