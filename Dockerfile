FROM node:12.15

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ecosystem.config.js /app/
COPY src/ /app/src/

RUN npm i --no-optional
RUN npm run build

ENV NODE_ENV production

EXPOSE 3000
CMD ["./node_modules/.bin/pm2-runtime", "ecosystem.config.js"]