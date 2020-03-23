import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';
import { ImageKind } from '~/type';

@Entity()
export default class Image {
  static of(postImage: Partial<Image>): Image {
    return new this(postImage);
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Index({ unique: true })
  @Column()
  uri?: string;

  @Column({
    type: 'enum',
    enum: ['post'],
    default: 'post',
  })
  kind?: ImageKind;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(image: Partial<Image>) {
    Object.assign(this, image);
  }
}
