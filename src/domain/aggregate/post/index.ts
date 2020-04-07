import { EntitySchemaColumnOptions, EntitySchema } from 'typeorm';
import { Category, CategorySchema } from './category.entity';
import { Comment, CommentSchema } from './comment.entity';
import PostToCategory from './post-to-category.entity';
import { BaseEntity, baseSchema } from '../base';

type PostEntity = {
  title: string;
  content: string;
  thumbnail?: string;
  views?: number;
  categories?: Array<Category>;
  comments?: Array<Comment>;
};

const schemaColumn: { [id in keyof PostEntity]: EntitySchemaColumnOptions } = {
  title: {
    type: 'varchar',
  },
  content: {
    type: 'text',
  },
  thumbnail: {
    type: 'varchar',
    nullable: true,
  },
  views: {
    type: 'int',
    default: 0,
  },
};

type Post = PostEntity & BaseEntity;

const PostSchema = new EntitySchema<Post>({
  name: 'post',
  columns: {
    ...baseSchema,
    ...schemaColumn,
  },
  relations: {
    categories: {
      type: 'many-to-many',
      target: 'category',
      joinTable: {
        name: 'post_to_category',
        joinColumn: { name: 'postId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'categoryId', referencedColumnName: 'id' },
      },
    },
    comments: {
      type: 'one-to-many',
      target: 'comment',
    },
  },
  indices: [
    {
      fulltext: true,
      columns: ['content'],
    },
  ],
});

export {
  Post,
  Category,
  Comment,
  PostToCategory,
};

export {
  PostSchema,
  CategorySchema,
  CommentSchema,
};
