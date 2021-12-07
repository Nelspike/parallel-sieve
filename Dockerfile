# Install & Build
FROM node:lts-alpine3.14 AS install

COPY . /app
WORKDIR /app

RUN npm ci
RUN npm run compile

# Run script
FROM node:lts-alpine3.14

WORKDIR /app

COPY --from=install /app/node_modules ./node_modules
COPY --from=install /app/dist ./dist
COPY --from=install /app/package.json ./package.json

CMD ["node", "./dist/index.js"]
