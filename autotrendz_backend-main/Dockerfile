# Build Stage
FROM node:20.9 AS build
WORKDIR /build
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN NODE_ENV=production yarn build

# Runtime Stage
FROM node:20.9
WORKDIR /app

RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

COPY --from=build /build/dist/ ./dist/
COPY --from=build /build/package.json .
COPY --from=build /build/yarn.lock .

# Install production dependencies only
RUN yarn install --production

EXPOSE 3000
CMD ["yarn", "start:prod"]
