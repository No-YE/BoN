/*eslint-disable @typescript-eslint/no-unused-vars*/
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeUpdate, BeforeInsert,
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

  constructor(postImage: Partial<PostImage>) {
    Object.assign(this, postImage);
  }
}
