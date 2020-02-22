/*eslint-disable @typescript-eslint/no-unused-vars*/
import {
  Entity, BeforeUpdate, BeforeInsert, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable,
} from 'typeorm';
import { Post, Category } from '~/data/entity';
import CategoryModel from './category.model';

@Entity()
export default class PostModel implements Partial<Post> {
  static of(post: Partial<Post>): PostModel {
    return new this(post);
  }

  @PrimaryGeneratedColumn()
  id?: string | number;

  @Column()
  title?: string;

  @Column()
  content?: string;

  @Column()
  user?: import('../../data/entity').User;

  @ManyToMany((_) => CategoryModel)
  @JoinTable()
  categories?: Array<Category>;

  @Column()
  isActive?: boolean;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @BeforeInsert()
  updateDateCreation(): void {
    const currentDate = new Date();
    this.createdAt = currentDate;
    this.updatedAt = currentDate;
  }

  @BeforeUpdate()
  updateDateUpdate(): void {
    this.updatedAt = new Date();
  }

  constructor(post: Partial<Post>) {
    Object.assign(this, post);
  }
}
