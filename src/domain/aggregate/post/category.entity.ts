import { EntitySchemaColumnOptions, EntitySchema } from 'typeorm';
import { Post } from '.';
import { BaseEntity, baseSchema } from '../base';

type CategoryEntity = {
  name: string;
  post?: Array<Post>;
};

const schemaColumn: { [id in keyof CategoryEntity]: EntitySchemaColumnOptions } = {
  name: {
    type: 'varchar',
  },
};

export type Category = CategoryEntity & BaseEntity;

export const CategorySchema = new EntitySchema<Category>({
  name: 'category',
  columns: {
    ...baseSchema,
    ...schemaColumn,
  },
  relations: {
    post: {
      type: 'many-to-many',
      target: 'post',
      joinTable: {
        name: 'post_to_category',
        joinColumn: { name: 'categoryId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'postId', referencedColumnName: 'id' },
      },
    },
  },
  indices: [
    {
      unique: true,
      columns: ['name'],
    },
  ],
});
