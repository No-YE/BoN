export type CraetePostDto = {
  title: string;
  content: string;
  userId: number;
  categoryNames: Array<{ name: string }>;
};

export type UpdatePostDto = {
  id: number;
  title: string;
  content: string;
  categoryNames: Array<{ name: string }>;
};

export type DeletePostDto = {
  id: string | number;
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

export type FindPostsByCategory = {
  take: number;
  limit: number;
  categoryId: string | number;
};

export type FindPostDto = {
  id: number;
};
