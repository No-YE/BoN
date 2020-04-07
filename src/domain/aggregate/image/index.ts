import { EntitySchema, EntitySchemaColumnOptions } from 'typeorm';
import { ImageKind } from '~/type';
import { baseSchema, BaseEntity } from '../base';

type ImageEntity = {
  uri: string;
  kind: ImageKind;
};

const schemaColumn: { [id in keyof Required<ImageEntity>]: EntitySchemaColumnOptions } = {
  uri: {
    type: 'varchar',
  },
  kind: {
    type: 'enum',
    enum: ['post'],
    default: 'post',
  },
};

export type Image = ImageEntity & BaseEntity;

export const ImageSchema = new EntitySchema<Image>({
  name: 'image',
  columns: {
    ...baseSchema,
    ...schemaColumn,
  },
  indices: [
    {
      unique: true,
      columns: ['uri'],
    },
  ],
});
