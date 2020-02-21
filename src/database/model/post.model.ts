import {
  Entity, BeforeUpdate, BeforeInsert, PrimaryGeneratedColumn, Column,
} from 'typeorm';
import { Post } from '~/data/entity';

@Entity()
export default class PostModel implements Partial<Post> {
  @PrimaryGeneratedColumn()
  id?: string | number;

  @Column()
  title?: string;

  @Column()
  content?: string;

  @Column()
  user?: import('../../data/entity').User;

  @Column()
  categories?: Array<import('../../data/entity').Category>;

  @Column()
  comments?: Array<Comment>;

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
