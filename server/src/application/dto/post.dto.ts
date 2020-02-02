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

export type findPostsDto = Partial<{
  offset: number;
  limit: number;
  query: string;
  categoryIds: Array<string | number>;
}>;

export type findPostDto = {
  id: string | number;
};
