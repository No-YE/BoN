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

type GetPostsByCategoryPayload = {
  offset?: number;
  limit?: number;
};

export const getPostByCategory = (payload: GetPostsByCategoryPayload, categoryId: number): Promise<AxiosResponse> => {
  const query = queryString.stringify(payload);
  return axios.get(`/post/category/${categoryId}?${query}`);
};

type SearchPostsPayload = {
  offset?: number;
  limit?: number;
  q: string;
};

export const searchPosts = (payload: SearchPostsPayload): Promise<AxiosResponse> => {
  const query = queryString.stringify(payload);
  return axios.get(`/post/search?${query}`);
};

export const getPostById = (id: number): Promise<AxiosResponse> => axios.get(`/post/${id}`);

type CreatePostPayload = {
  title: string;
  content: string;
  thumbnail?: string;
  categoryNames: Array<string>;
};

export const createPost = (payload: CreatePostPayload): Promise<AxiosResponse> => axios.post('/post', payload);

export const getAllCategories = (): Promise<AxiosResponse> => axios.get('/category');
