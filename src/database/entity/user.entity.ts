/*eslint-disable @typescript-eslint/no-unused-vars*/
import {
  Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, JoinColumn,
} from 'typeorm';
import { UserRole } from '~/type';
import Post from './post.entity';

@Entity()
export default class User {
  static of(user: Partial<User>): User {
    return new this(user);
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  email?: string;

  @Column()
  socialId?: string;

  @Column()
  role?: UserRole;

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

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
