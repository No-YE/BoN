import { Sequelize } from 'sequelize';
import { map, TaskEither } from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import { userAttribute, UserModelAttributes, UserModelStatic } from './model/user.model';
import { postAttribute, PostModelAttributes, PostModelStatic } from './model/post.model';
import { categoryAttribute, CategoryModelAttributes, CategoryModelStatic } from './model/category.model';
import { getMysqlEnv, MysqlEnv } from '../constant/env';

export default function makeSequelize(): TaskEither<Error, Sequelize> {
  function getSequelize(mysqlEnv: MysqlEnv) {
    const { database, host, password, port, user } = mysqlEnv;

    return new Sequelize(database, user, password, {
      host,
      port,
      dialect: 'mysql',
      define: {
        underscored: true,
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

  function setAssociate(sequelize: Sequelize) {
    const UserModel = <UserModelStatic>sequelize.define('User', userAttribute as UserModelAttributes);
    const PostModel = <PostModelStatic>sequelize.define('Post', postAttribute as PostModelAttributes);
    const CategoryModel = <CategoryModelStatic>sequelize.define('Category', categoryAttribute as CategoryModelAttributes);

    UserModel.hasMany(PostModel);
    PostModel.belongsTo(UserModel);

    PostModel.belongsToMany(CategoryModel, { through: 'post_category' });
    CategoryModel.belongsToMany(PostModel, { through: 'post_category' });

    return sequelize;
  }

  return pipe(
    getMysqlEnv(),
    map((mysqlEnv: MysqlEnv) => getSequelize(mysqlEnv)),
    map(setAssociate),
  );
}