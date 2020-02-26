/*eslint-disable @typescript-eslint/no-unused-vars*/
import {
  Column, PrimaryGeneratedColumn, Entity, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn,
} from 'typeorm';
import Post from '../post';

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

  @ManyToOne((_) => Post)
  @JoinColumn()
  post?: Post;

  @Column()
  userId?: number;

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

  constructor(comment: Partial<Comment>) {
    Object.assign(this, comment);
  }
}
