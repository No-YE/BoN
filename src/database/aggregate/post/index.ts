/*eslint-disable @typescript-eslint/no-unused-vars*/
import {
  Entity, BeforeUpdate, BeforeInsert, PrimaryGeneratedColumn,
  Column, ManyToMany, JoinTable, OneToMany, JoinColumn, Index,
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

  @Column()
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

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
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

export {
  Category,
  Comment,
};
