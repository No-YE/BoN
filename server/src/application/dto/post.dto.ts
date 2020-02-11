export type CraetePostDto = {
  title: string;
  content: string;
  userId: number | string;
  categoryIds: Array<string | number>;
};

export type UpdatePostDto = {
  title: string;
  content: string;
  categoryIds: Array<string | number>;
};

export type DeletePostDto = {
  id: string | number;
};

export type SearchPostsDto = {
  offset: number;
  limit: number;
  query: string;
};

export type FindNewPostsDto = {
  offset: number;
  limit: number;
};

export type FindPostsByCategory = {
  offset: number;
  limit: number;
  categoryId: string | number;
};

export type FindPostDto = {
  id: string | number;
};
