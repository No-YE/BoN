import {
  DataTypes, Model, BuildOptions, ModelAttributeColumnOptions, AbstractDataTypeConstructor, AbstractDataType,
} from 'sequelize';
import { Category } from '~/data/entity';

type CategoryModel = Category & typeof Model;

export type CategoryModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CategoryModel;
};

export type CategoryModelAttributes = {
  [name in (keyof Category)]: ModelAttributeColumnOptions | string | AbstractDataTypeConstructor | AbstractDataType;
};

export const categoryAttribute: Partial<CategoryModelAttributes> = {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
  },
};
