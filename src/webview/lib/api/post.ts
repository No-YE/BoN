import queryString from 'query-string';
import { AxiosResponse } from 'axios';
import axios from '../axios-client';

type GetPostsPayload = {
  offset?: number;
  limit?: number;
};

export const getPosts = (payload: GetPostsPayload): Promise<AxiosResponse> => {
  const query = queryString.stringify(payload);
  return axios.get(`/post?${query}`);
};

type CreatePostPayload = {
  title: string;
  content: string;
  categoryNames: Array<string>;
};

export const createPost = (payload: CreatePostPayload): Promise<AxiosResponse> => axios.post('/post', payload);

export const getAllCategories = (): Promise<AxiosResponse> => axios.get('/post/category');
