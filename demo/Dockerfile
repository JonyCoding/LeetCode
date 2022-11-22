#FROM node:16.15.0-alpine3.14 as build-stage
FROM 275106820702.dkr.ecr.ap-northeast-1.amazonaws.com/base/nss-node16:latest as build-stage

WORKDIR '/app'

# Install some depenendencies
COPY _WebApp/package.json .
COPY _WebApp/gulpfile.js .
RUN npm install \
    && npm install -g gulp
COPY _WebApp/.  .

RUN gulp dist

# production stage
FROM nginx:stable-alpine as production-stage
COPY nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=build-stage /Public/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
