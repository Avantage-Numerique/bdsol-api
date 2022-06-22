FROM node:lts-alpine

## API

RUN mkdir -p /api
WORKDIR /api
COPY . .

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    python3 \
    make \
    g++
RUN npm install -g node-gyp
RUN npm install -g @mapbox/node-pre-gyp
RUN npm install argon2
RUN npm install
RUN npm rebuild argon2

# Argon2 prebuild library seem off. We rebuild them all with this.
# RUN npm rebuild

EXPOSE 8000

ENTRYPOINT ["npm"]
CMD ["run","dev"]