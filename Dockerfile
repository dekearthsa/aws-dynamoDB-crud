FROM --platform=linux/amd64 node:lts-alpine
# RUN apk add --no-cache tini && mkdir -p /usr/src/app
# RUN mkdir -p /usr/src/app
WORKDIR /usr/src

COPY package.json .
COPY package-lock.json .

RUN npm install && npm cache clean --force

COPY . .
ENV key=2234
EXPOSE 2234

CMD ["node", "./dist/index.js"]