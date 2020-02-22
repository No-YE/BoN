import {
  Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate,
} from 'typeorm';
import { User } from '~/data/entity';

@Entity()
export default class UserModel implements Partial<User> {
  static of(user: Partial<User>): UserModel {
    return new this(user);
  }

  @PrimaryGeneratedColumn()
  id?: string | number;

  @Column()
  socialId?: string;

  @Column()
  name?: string;

  @Column()
  email?: string;

  @Column()
  role?: import('../../type').UserRole;

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
