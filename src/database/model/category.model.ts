import {
  Column, PrimaryGeneratedColumn, Entity, BeforeInsert, BeforeUpdate,
} from 'typeorm';
import { Category } from '~/data/entity';

@Entity()
export default class CategoryModel implements Partial<Category> {
  @PrimaryGeneratedColumn()
  id?: string | number;

  @Column()
  name?: string;

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

  constructor(category: Partial<Category>) {
    Object.assign(this, category);
  }
}
