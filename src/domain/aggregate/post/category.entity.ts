/*eslint-disable @typescript-eslint/no-unused-vars*/
import {
  Column, PrimaryGeneratedColumn, Entity, UpdateDateColumn, CreateDateColumn, OneToMany,
} from 'typeorm';
import Post from '.';
import PostToCategory from './post-to-category.entity';

@Entity()
export default class Category {
  static of(category: Partial<Category>): Category {
    return new this(category);
  }

  @PrimaryGeneratedColumn()
  id?: string | number;

  @Column()
  name?: string;

  @Column({ default: true, nullable: true })
  isActive?: boolean;

  @OneToMany((_) => PostToCategory, (postToCategory) => postToCategory.category)
  postToCategories?: Array<PostToCategory>;

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  constructor(category: Partial<Category>) {
    Object.assign(this, category);
  }
}
