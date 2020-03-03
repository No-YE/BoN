import { ConnectionOptions, createConnection } from 'typeorm';
import to from 'await-to-js';
import { map, TaskEither, fromEither } from 'fp-ts/lib/TaskEither';
import { Either, left, right } from 'fp-ts/lib/Either';
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

const ormconfig = pipe(
  fromEither(getMysqlEnv()),
  map(makeOrmConfig),
);

function connect(connectionOptions: ConnectionOptions): TaskEither<Error, null> {
  return async (): Promise<Either<Error, null>> => {
    const [err] = await to(createConnection(connectionOptions));
    return err ? left<Error, null>(err) : right<Error, null>(null);
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

module.exports.ormconfig = ormconfig;
module.exports.connect = connect;

export {
  ormconfig,
  connect,
};
