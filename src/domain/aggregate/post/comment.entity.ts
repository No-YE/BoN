import {
  Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn, UpdateDateColumn, CreateDateColumn,
} from 'typeorm';
import Post from '.';

@Entity()
export default class Comment {
  static of(comment: Partial<Comment>): Comment {
    return new this(comment);
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  content?: string;

  @Column()
  isActive?: boolean;

  @ManyToOne(() => Post)
  @JoinColumn()
  post?: Post;

  @Column()
  userId?: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(comment: Partial<Comment>) {
    Object.assign(this, comment);
  }
}
