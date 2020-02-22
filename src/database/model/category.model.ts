/*eslint-disable @typescript-eslint/no-unused-vars*/
import {
  Column, PrimaryGeneratedColumn, Entity, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable,
} from 'typeorm';
import { Category, Post } from '~/data/entity';
import PostModel from './post.model';

@Entity()
export default class CategoryModel implements Partial<Category> {
  static of(category: Partial<Category>): CategoryModel {
    return new this(category);
  }

  @PrimaryGeneratedColumn()
  id?: string | number;

  @Column()
  name?: string;

  @Column()
  isActive?: boolean;

  @ManyToMany((_) => PostModel)
  @JoinTable()
  posts?: Array<Post>;

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

  constructor(category: Partial<Category>) {
    Object.assign(this, category);
  }
}
