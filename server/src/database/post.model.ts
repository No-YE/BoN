import {
  DataTypes, Model, BuildOptions, ModelAttributeColumnOptions, AbstractDataTypeConstructor, AbstractDataType,
} from 'sequelize';
import db from './db';
import { Post } from '~/data/entity';

type PostModel = Post & typeof Model;
type PostModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): PostModel;  
};

type PostModelAttributes = {
  [name in (keyof Post)]: ModelAttributeColumnOptions | string | AbstractDataTypeConstructor | AbstractDataType;
};

const PostAttribute: Partial<PostModelAttributes> = {
  id: {
   type: DataTypes.BIGINT.UNSIGNED,
   primaryKey: true,
   autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
};

export const PostModel = <PostModelStatic>db.define('Posts', PostAttribute as PostModelAttributes);