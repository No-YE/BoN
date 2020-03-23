import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import Post from '.';
import Category from './category.entity';

@Entity()
export default class PostToCategory {
  static of(postToCategory: Partial<PostToCategory>): PostToCategory {
    return new this(postToCategory);
  }

  @ManyToOne((_) => Post, { primary: true })
  @JoinColumn()
  post?: Post;

  @ManyToOne((_) => Category, { primary: true })
  @JoinColumn()
  category?: Category;

  constructor(postToCategory: Partial<PostToCategory>) {
    Object.assign(this, postToCategory);
  }
}
