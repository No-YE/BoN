/*eslint-disable @typescript-eslint/no-unused-vars*/
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, JoinColumn, Index, CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Category from './category.entity';
import Comment from './comment.entity';

@Entity()
export default class Post implements Partial<Post> {
  static of(post: Partial<Post>): Post {
    return new this(post);
  }

  @PrimaryGeneratedColumn()
  id?: string | number;

  @Index({ fulltext: true })
  @Column()
  title?: string;

  @Column({ length: 20000 })
  content?: string;

  @Column()
  userId?: number;

  @ManyToMany((_) => Category)
  @JoinTable()
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
};
