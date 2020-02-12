import {
  DataTypes, Model, BuildOptions, ModelAttributeColumnOptions, AbstractDataTypeConstructor, AbstractDataType,
} from 'sequelize';
import db from './db';
import { User } from '~/data/entity';

type UserModel = User & typeof Model;
type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;  
};
type UserModelAttributes = {
  [name in (keyof User)]: ModelAttributeColumnOptions | string | AbstractDataTypeConstructor | AbstractDataType;
};

const userAttribute: UserModelAttributes = {
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
  createdAt: {
    type: DataTypes.TIME,
  },
  updatedAt: {
    type: DataTypes.TIME,
  }
};

export const UserModel = <UserModelStatic>db.define('Users', userAttribute, {
  timestamps: true,
})

