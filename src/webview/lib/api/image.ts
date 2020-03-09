import queryString from 'query-string';
import { AxiosResponse } from 'axios';
import axios from '../axios-client';

type GetSignedUrl = {
  filename: string;
  kind: 'post';
};

//eslint-disable-next-line import/prefer-default-export
export function getSignedUrl(payload: GetSignedUrl): Promise<AxiosResponse> {
  const query = queryString.stringify(payload);
  return axios.get(`/image?${query}`);
}
