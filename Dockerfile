FROM node:latest
LABEL authors="fabienlamarque"

RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - #Pour que ça marche sur MacOS
RUN apt-get -yq update \
    && apt-get -yq upgrade \
    && apt-get install -yq nodejs
RUN npm install -g npm

RUN npm install --global http-server

WORKDIR /usr/src/app
COPY package.json package-lock.json /usr/src/app/
RUN npm install

EXPOSE 8080

CMD ["npx", "http-server", "-p8080"]