/*eslint-disable @typescript-eslint/no-unused-vars*/
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from 'typeorm';
import Post from '.';
import Category from './category.entity';

@Entity()
export default class PostToCategory {
  static of(postToCategory: Partial<PostToCategory>): PostToCategory {
    return new this(postToCategory);
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  postId!: number;

  @Column()
  categoryId!: number;

  @ManyToOne((_) => Post, (post) => post.postToCategories)
  post!: Post;

  @ManyToOne((_) => Category, (category) => category.postToCategories)
  category!: Category;

  constructor(postToCategory: Partial<PostToCategory>) {
    Object.assign(this, postToCategory);
  }
}
