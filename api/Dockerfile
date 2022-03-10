FROM node:16-alpine AS deps

## API
WORKDIR /usr/src/api
COPY package*.json ./


RUN npm install

COPY . .

EXPOSE 8000


ENTRYPOINT ["node"]
CMD ["index.js"]