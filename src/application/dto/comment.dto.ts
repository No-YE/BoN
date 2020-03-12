export type CreateCommentDto = {
  content: string;
  postId: string | number;
  userId: string | number;
};

export type UpdateCommentDto = {
  content: string;
  postId: string | number;
  userId: string | number;
};

export type DeleteCommentDto = {
  id: string | number;
  userId: string | number;
};

export type FindCommentsDto = {
  skip: number;
  take: number;
};
