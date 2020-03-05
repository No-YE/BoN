export type CraetePostDto = {
  title: string;
  content: string;
  userId: number;
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
  take: number;
  limit: number;
  query: string;
};

export type FindNewPostsDto = {
  take: number;
  limit: number;
};

export type FindByCategory = {
  take: number;
  limit: number;
  categoryId: number;
};

export type FindPostDto = {
  id: number;
};
