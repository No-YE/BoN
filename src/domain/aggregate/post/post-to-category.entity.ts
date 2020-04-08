import { EntitySchema } from 'typeorm';
import { Post } from '.';
import { Category } from './category.entity';
import { BaseEntity, baseSchema } from '../base';

type PostToCategoryEntity = {
  post: Post;
  category: Category;
};

export type PostToCategory = PostToCategoryEntity & BaseEntity;

export const PostToCategorySchema = new EntitySchema<PostToCategory>({
  name: 'post_to_category',
  columns: {
    ...baseSchema,
  },
  relations: {
    post: {
      type: 'many-to-one',
      target: 'post',
    },
    category: {
      type: 'many-to-one',
      target: 'category',
    },
  },
});
