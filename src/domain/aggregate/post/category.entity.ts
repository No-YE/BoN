/*eslint-disable @typescript-eslint/no-unused-vars*/
import {
  Column, PrimaryGeneratedColumn, Entity, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable,
} from 'typeorm';
import Post from '../post';

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
  @JoinTable()
  posts?: Array<Post>;

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

  constructor(category: Partial<Category>) {
    Object.assign(this, category);
  }
}
