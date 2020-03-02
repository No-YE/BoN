/*eslint-disable @typescript-eslint/no-unused-vars*/
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import Post from '.';

@Entity()
export default class PostImage {
  static of(postImage: Partial<PostImage>): PostImage {
    return new this(postImage);
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  uri?: string;

  @ManyToOne((_) => Post)
  post?: Post;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(postImage: Partial<PostImage>) {
    Object.assign(this, postImage);
  }
}
