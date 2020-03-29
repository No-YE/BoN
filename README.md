# Blog of NoYE
![](https://github.com/No-YE/BoN/workflows/Deploy%20to%20Amazon%20ECS/badge.svg?branch=master)
![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)

## Description
NoYE's personal tech blog

https://www.noye.xyz

## Quick Start

``` sh
export NODE_ENV=production

export SENTRY_DSN="SENTRY_DSN"

export SESSION_SECRET="SESSION_SECRET"
export JWT_SECRET="JWT_SECRET"

export GOOGLE_CLIENT_ID="GOOGLE_CLIENT_ID"
export GOOGLE_CLIENT_SECRET="GOOGLE_CLIENT_SECRET"
export GOOGLE_REDIRECT_URI=http://localhost:3000/api/v1/user/google/callback

export MYSQL_HOST=localhost
export MYSQL_PORT=3306
export MYSQL_DATABASE=bon_test
export MYSQL_USERNAME=test
export MYSQL_PASSWORD=test

export AWS_ACCESS_KEY_ID="AWS_ACCESS_KEY_UD"
export AWS_SECRET_ACCESS_KEY="AWS_SECRET_ACCESS_KEY"
export AWS_DEFAULT_REGION="AWS_DEFAULT_REGION"
```

install dependencies
``` sh
$ npm i
```

compile typescript and build next.js
``` sh
$ npm run build
```

start database(mysql)
``` sh
$ docker-compose up -d
```

create database
``` sh
$ chmod +x ./bin/create-db && ./bin/create-db
```

migrate typeorm entity
``` sh
$ npm run typeorm:run
```

start server
``` sh
$ node dist
```

## Tech / framework used

### Backend
- Typescript
- Express.js
- fp-ts
- typeorm

### Frontend
- Typescript
- React.js
- Next.js
- MobX
- Material UI

### Infra
- AWS S3
- AWS EC2(nginx, mysql)
- AWS ECS
- Github Actions

## CLI
[BoN-cli]("https://github.com/No-YE/BoN-cli")