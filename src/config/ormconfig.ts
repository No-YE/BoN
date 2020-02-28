import { ConnectionOptions } from 'typeorm';
import { map } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import { getMysqlEnv, MysqlEnv } from './env';

function makeOrmConfig(env: MysqlEnv): ConnectionOptions {
  const {
    database, host, nodeEnv, password, port, username,
  } = env;

  return nodeEnv === 'development'
    ? {
      type: 'mysql',
      host,
      port,
      username,
      password,
      database,
      synchronize: true,
      logging: false,
      dropSchema: false,
      entities: [
        'dist/domain/aggregate/**/*.js',
      ],
      migrations: [
        'dist/migration/*.js',
      ],
      cli: {
        entitiesDir: 'src/domain/aggregate/**',
        migrationsDir: 'src/migration',
      },
    }
    : {
      type: 'mysql',
      replication: {
        master: {
          host,
          port,
          username,
          password,
          database,
        },
        slaves: [
          {
            host,
            port,
            username,
            password,
            database,
          },
        ],
      },
      synchronize: false,
      logging: false,
      migrationsRun: false,
      dropSchema: false,
      entities: [
        'dist/data/entity/*.js',
      ],
      migrations: [
        'dist/migration/*.js',
      ],
      cli: {
        entitiesDir: 'src/data/entity',
        migrationsDir: 'src/migration',
      },
      extra: {
        connectionLimit: 5,
      },
    };
}

module.exports = makeOrmConfig({
  database: process.env.MYSQL_DATABASE!,
  host: process.env.MYSQL_HOST!,
  nodeEnv: process.env.NODE_ENV!,
  password: process.env.MYSQL_PASSWORD!,
  port: parseInt(process.env.MYSQL_PORT!, 10),
  username: process.env.MYSQL_USERNAME!,
});

export default pipe(
  getMysqlEnv(),
  map(makeOrmConfig),
);
