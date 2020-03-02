/*eslint-disable @typescript-eslint/no-unused-vars*/
import {
  Entity, PrimaryGeneratedColumn, Column, Index, UpdateDateColumn, CreateDateColumn,
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

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
