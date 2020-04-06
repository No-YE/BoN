import { EntitySchema, EntitySchemaColumnOptions } from 'typeorm';
import { UserRole } from '~/type';
import { Social } from '~/type/social.type';
import { baseSchema, BaseEntity } from '../base';

type UserEntity = {
  name: string;
  email: string;
  social?: Social;
  role?: UserRole;
};

const schemaColumn: { [id in keyof Required<UserEntity>]: EntitySchemaColumnOptions } = {
  name: {
    type: 'varchar',
  },
  email: {
    type: 'varchar',
  },
  social: {
    type: 'enum',
    enum: ['google'],
    default: 'google',
  },
  role: {
    type: 'enum',
    enum: ['admin', 'operator', 'noRole'],
    default: 'noRole',
  },
};

export type User = UserEntity & BaseEntity;

export const UserSchema = new EntitySchema<User>({
  name: 'user',
  columns: {
    ...baseSchema,
    ...schemaColumn,
  },
  indices: [
    {
      unique: true,
      columns: ['email', 'social'],
    },
    {
      columns: ['email'],
    },
  ],
});
