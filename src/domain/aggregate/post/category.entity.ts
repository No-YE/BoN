/*eslint-disable @typescript-eslint/no-unused-vars*/
import {
  Column, PrimaryGeneratedColumn, Entity, UpdateDateColumn, CreateDateColumn, ManyToMany, JoinTable,
} from 'typeorm';
import Post from '.';
import PostToCategory from './post-to-category.entity';

@Entity()
export default class Category {
  static of(category: Partial<Category>): Category {
    return new this(category);
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column({ default: true, nullable: true })
  isActive?: boolean;

  @ManyToMany((_) => Post)
  @JoinTable({
    name: 'post_to_category',
    joinColumn: { name: 'categoryId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'postId', referencedColumnName: 'id' },
  })
  post?: Array<Post>;

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  constructor(category: Partial<Category>) {
    Object.assign(this, category);
  }
}
