import {
  Column, PrimaryGeneratedColumn, Entity, UpdateDateColumn, CreateDateColumn, ManyToMany, JoinTable, Index,
} from 'typeorm';
import Post from '.';

@Entity()
export default class Category {
  static of(category: Partial<Category>): Category {
    return new this(category);
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Index({ unique: true })
  @Column()
  name?: string;

  @Column({ default: true, nullable: true })
  isActive?: boolean;

  @ManyToMany((_) => Post, (post) => post.categories)
  @JoinTable({
    name: 'post_to_category',
    joinColumn: { name: 'categoryId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'postId', referencedColumnName: 'id' },
  })
  post?: Array<Post>;

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  constructor(category: Partial<Category>) {
    Object.assign(this, category);
  }
}
