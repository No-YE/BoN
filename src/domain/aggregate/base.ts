import { EntitySchemaColumnOptions } from 'typeorm';

export type BaseEntity = Partial<{
  id: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}>;

export const baseSchema: { [id in keyof Required<BaseEntity>]: EntitySchemaColumnOptions } = {
  id: {
    type: 'bigint',
    primary: true,
    generated: true,
  },
  isActive: {
    type: 'boolean',
    default: true,
  },
  createdAt: {
    type: 'timestamp',
    createDate: true,
  },
  updatedAt: {
    type: 'timestamp',
    updateDate: true,
  },
};
