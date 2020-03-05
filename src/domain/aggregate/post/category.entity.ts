/*eslint-disable @typescript-eslint/no-unused-vars*/
import {
  Column, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable, UpdateDateColumn, CreateDateColumn,
} from 'typeorm';
import Post from '.';

@Entity()
export default class Category {
  static of(category: Partial<Category>): Category {
    return new this(category);
  }

  @PrimaryGeneratedColumn()
  id?: string | number;

  @Column()
  name?: string;

  @Column({ default: true, nullable: true })
  isActive?: boolean;

  @ManyToMany((_) => Post)
  posts?: Array<Post>;

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  constructor(category: Partial<Category>) {
    Object.assign(this, category);
  }
}
