import { EntitySchema } from 'typeorm';
import { Post } from '.';
import { Category } from './category.entity';

type PostToCategoryEntity = {
  post: Post;
  category: Category;
};

export type PostToCategory = PostToCategoryEntity;

export const PostToCategorySchema = new EntitySchema<PostToCategory>({
  name: 'post_to_category',
  columns: {},
  relations: {
    post: {
      type: 'many-to-one',
      target: 'post',
      primary: true,
    },
    category: {
      type: 'many-to-one',
      target: 'category',
      primary: true,
    },
  },
});
