/*eslint-disable @typescript-eslint/no-unused-vars*/
import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, Index, CreateDateColumn, UpdateDateColumn, ManyToMany,
  JoinTable,
} from 'typeorm';
import Category from './category.entity';
import Comment from './comment.entity';
import PostToCategory from './post-to-category.entity';

@Entity()
export default class Post {
  static of(post: Partial<Post>): Post {
    return new this(post);
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Index({ fulltext: true })
  @Column()
  title?: string;

  @Column({ length: 20000 })
  content?: string;

  @Column({ nullable: true })
  thumbnail?: string;

  @Column({ default: 0 })
  views?: number;

  @Column()
  userId?: number;

  @ManyToMany((_) => Category, (category) => category.post)
  @JoinTable({
    name: 'post_to_category',
    joinColumn: { name: 'postId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categoryId', referencedColumnName: 'id' },
  })
  categories?: Array<Category>;

  @OneToMany((_) => Comment, (comment) => comment.post)
  @JoinColumn()
  comments?: Array<Comment>;

  @Column({ default: true, nullable: true })
  isActive?: boolean;

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  constructor(post: Partial<Post>) {
    Object.assign(this, post);
  }
}

export {
  Category,
  Comment,
  PostToCategory,
};
