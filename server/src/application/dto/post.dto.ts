export type CraetePostDto = {
  title: string;
  content: string;
  userId: number | string;
};

export type UpdatePostDto = {
  title: string;
  content: string;
};

export type DeletePostDto = {
  id: string | number;
};

export type findPostsDto = {
  offset: number;
  limit: number;
  query: string;
};

export type findPostDto = {
  id: string | number;
};
