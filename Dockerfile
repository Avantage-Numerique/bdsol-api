FROM node:16-alpine as apibuild

# Install python3 into the deps of the container. For the argon bug : 2022-05-30 : Error: Error loading shared library /api/node_modules/argon2/lib/binding/napi-v3/argon2.node: Exec format error
RUN apk update \
    && apk --no-cache --virtual build-dependencies add \
        python3 \
        make \
        g++ \
        git \
        openssh \
    && npm install -g node-gyp \
    && npm install -g @mapbox/node-pre-gyp

## API
RUN mkdir -p /api
WORKDIR /api

COPY ./package.json .
COPY ./src .
COPY ./doc .
COPY ./.env .
COPY ./tsconfig.json .
COPY ./nodemon.json .

RUN npm install

# Argon2 prebuild library seem off. We rebuild them all with this.
RUN npm rebuild

RUN npm rebuild argon2

EXPOSE 8000

ENTRYPOINT ["npm"]
CMD ["run","dev"]