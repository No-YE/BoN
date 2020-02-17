import {
  DataTypes, Model, BuildOptions, ModelAttributeColumnOptions, AbstractDataTypeConstructor, AbstractDataType,
} from 'sequelize';
import { Post } from '~/data/entity';

type PostModel = Post & Model;

export type PostModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): PostModel;
};

export type PostModelAttributes = {
  [name in (keyof Post)]: ModelAttributeColumnOptions | string | AbstractDataTypeConstructor | AbstractDataType;
};

export const postAttribute: Partial<PostModelAttributes> = {
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
