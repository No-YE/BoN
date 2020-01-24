import { User } from "./user.entity";

export type Post = {
  id: string;
  title: string;
  content: string;
  user: User;
  comments: Array<Comment>;
  createdAt: Date;
  updatedAt: Date;
}
