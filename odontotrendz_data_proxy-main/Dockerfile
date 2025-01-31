FROM node:20.9-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --production --frozen-lockfile

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]