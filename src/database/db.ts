import { Sequelize } from 'sequelize';
import { map, TaskEither } from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import { userAttribute, UserModelAttributes, UserModelStatic } from './model/user.model';
import { postAttribute, PostModelAttributes, PostModelStatic } from './model/post.model';
import { categoryAttribute, CategoryModelAttributes, CategoryModelStatic } from './model/category.model';
import { getMysqlEnv, MysqlEnv } from '../constant/env';
import { User } from '~/data/entity';

export type Models = {
  UserModel: UserModelStatic;
  PostModel: PostModelStatic;
  CategoryModel: CategoryModelStatic;
};

function getSequelize(mysqlEnv: MysqlEnv): Sequelize {
  const {
    database, host, password, port, user,
  } = mysqlEnv;

  return new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'mysql',
    define: {
      freezeTableName: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: true,
    },
    sync: {
      alter: true,
    },
    pool: {
      max: 5,
    },
  });
}

function setAssociate(sequelize: Sequelize): Sequelize {
  const UserModel = sequelize.define('User', userAttribute as UserModelAttributes) as UserModelStatic;
  const PostModel = sequelize.define('Post', postAttribute as PostModelAttributes) as PostModelStatic;
  const CategoryModel = sequelize.define(
    'Category',
    categoryAttribute as CategoryModelAttributes,
  )as CategoryModelStatic;

  UserModel.hasMany(PostModel);
  PostModel.belongsTo(UserModel);

  PostModel.belongsToMany(CategoryModel, { through: 'post_category' });
  CategoryModel.belongsToMany(PostModel, { through: 'post_category' });

  return sequelize;
}

function getModels(sequelize: Sequelize): Models {
  const UserModel = sequelize.define('User', userAttribute as UserModelAttributes) as UserModelStatic;
  const PostModel = sequelize.define('Post', postAttribute as PostModelAttributes) as PostModelStatic;
  const CategoryModel = sequelize.define(
    'Category',
    categoryAttribute as CategoryModelAttributes,
  )as CategoryModelStatic;

  UserModel.hasMany(PostModel);
  PostModel.belongsTo(UserModel);

  PostModel.belongsToMany(CategoryModel, { through: 'post_category' });
  CategoryModel.belongsToMany(PostModel, { through: 'post_category' });

  return {
    UserModel,
    PostModel,
    CategoryModel,
  };
}

export function makeModels(): TaskEither<Error, Models> {
  return pipe(
    getMysqlEnv(),
    map((mysqlEnv: MysqlEnv) => getSequelize(mysqlEnv)),
    map(getModels),
  );
}

export default function makeSequelize(): TaskEither<Error, Sequelize> {
  return pipe(
    getMysqlEnv(),
    map((mysqlEnv: MysqlEnv) => getSequelize(mysqlEnv)),
    map(setAssociate),
  );
}
