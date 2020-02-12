import {
  DataTypes, Model, BuildOptions, ModelAttributeColumnOptions, AbstractDataTypeConstructor, AbstractDataType,
} from 'sequelize';
import db from './db';
import { Category } from '~/data/entity';
import PostModel from './post.model';

type CategoryModel = Category & typeof Model;
type CategoryModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CategoryModel;  
};

type CategoryModelAttributes = {
  [name in (keyof Category)]: ModelAttributeColumnOptions | string | AbstractDataTypeConstructor | AbstractDataType;
};

const CategoryAttribute: Partial<CategoryModelAttributes> = {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
  },
  name: {
    type: DataTypes.STRING,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
  },
};

const CategoryModel = <CategoryModelStatic>db.define('Categorys', CategoryAttribute as CategoryModelAttributes);
CategoryModel.belongsTo(PostModel);

export default CategoryModel;