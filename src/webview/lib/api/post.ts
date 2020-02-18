import queryString from 'query-string';
import axios from '../axios-client';

type GetPostsPayload = {
  offset?: number;
  limit?: number;
};

export const getPosts = (payload: GetPostsPayload) => {
  const query = queryString.stringify(payload);
  return axios.get(`/post?${query}`);
};
