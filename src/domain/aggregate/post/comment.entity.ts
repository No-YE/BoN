import { EntitySchemaColumnOptions, EntitySchema } from 'typeorm';
import { Post } from '.';
import { BaseEntity, baseSchema } from '../base';

type CommentEntity = {
  content: string;
  userId: number;
  post?: Post;
};

const schemaColumn: { [id in keyof CommentEntity]: EntitySchemaColumnOptions } = {
  content: {
    type: 'varchar',
  },
  userId: {
    type: 'int64',
  },
};

export type Comment = CommentEntity & BaseEntity;

export const CommentSchema = new EntitySchema<Comment>({
  name: 'comment',
  columns: {
    ...baseSchema,
    ...schemaColumn,
  },
  relations: {
    post: {
      type: 'many-to-one',
      target: 'post',
    },
  },
});
