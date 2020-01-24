import { Post } from "./post.entity";

export type Comment = {
  id: number;
  content: string;
  post: Post;
  createdAt: Date;
  updatedAt: Date;
};
