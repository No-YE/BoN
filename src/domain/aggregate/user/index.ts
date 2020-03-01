/*eslint-disable @typescript-eslint/no-unused-vars*/
import {
  Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, Index,
} from 'typeorm';
import { UserRole } from '~/type';
import { Social } from '~/type/social.type';

@Entity()
@Index(['email', 'social'], { unique: true })
export default class User {
  static of(user: Partial<User>): User {
    return new this(user);
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Index()
  @Column()
  email?: string;

  @Column({
    type: 'enum',
    enum: ['google'],
    default: 'google',
  })
  social?: Social;

  @Column({
    type: 'enum',
    enum: ['admin', 'operator', 'noRole'],
    default: 'noRole',
  })
  role?: UserRole;

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

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
