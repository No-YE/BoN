FROM node:12.15

WORKDIR /app

COPY package.json package-lock.json ecosystem.config.js dist/ /app/
RUN npm i --no-optional

ENV NODE_ENV production

CMD ["node node_modules/.bin/pm2-runtime ecosystem.config.js"]