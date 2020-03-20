import { UserRole } from '~/type';

export type CraetePostDto = {
  title: string;
  content: string;
  userId: number;
  thumbnail?: string;
  categoryNames: Array<string>;
};

export type UpdatePostDto = {
  id: number;
  title: string;
  content: string;
  categoryNames: Array<string>;
};

export type DeletePostDto = {
  id: number;
};

export type SearchPostsDto = {
  skip: number;
  take: number;
  query: string;
};

export type FindNewPostsDto = {
  skip: number;
  take: number;
};

export type FindByCategory = {
  skip: number;
  take: number;
  categoryId: number;
};

export type FindPostDto = {
  id: number;
  userRole?: UserRole;
};
