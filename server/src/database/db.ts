import { Sequelize } from 'sequelize';
import { userAttribute, UserModelAttributes, UserModelStatic } from './model/user.model';
import { postAttribute, PostModelAttributes, PostModelStatic } from './model/post.model';
import { categoryAttribute, CategoryModelAttributes, CategoryModelStatic } from './model/category.model';

const sequelize = new Sequelize('bon_test', 'test', 'test', {
  host: 'localhost',
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

export const UserModel = <UserModelStatic>sequelize.define('User', userAttribute as UserModelAttributes);
export const PostModel = <PostModelStatic>sequelize.define('Post', postAttribute as PostModelAttributes);
export const CategoryModel = <CategoryModelStatic>sequelize.define('Category', categoryAttribute as CategoryModelAttributes);

UserModel.hasMany(PostModel);
PostModel.belongsTo(UserModel);

PostModel.belongsToMany(CategoryModel, { through: 'post_category' });
CategoryModel.belongsToMany(PostModel, { through: 'post_category' });

export default sequelize;