import { Post } from "~/data/entity";

export type CraetePostDto = {
  title: string,
  content: string,
  userId: number | string,
};


export type UpdatePostDto = {
  title: string,
  content: string,
};

export type DeletePostDto = {
  id: string | number,
};