import {
  DataTypes, Model, BuildOptions, ModelAttributeColumnOptions, DataType,
} from 'sequelize';
import { User } from '~/data/entity';

type UserModel = User & typeof Model;

export  type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

export type UserModelAttributes = {
  [name in (keyof User)]: ModelAttributeColumnOptions | DataType;
};

export const userAttribute: Partial<UserModelAttributes> = {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'operator', 'noRole'),
    defaultValue: 'noRole',
  },
  socialId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
};