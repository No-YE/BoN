import axios from 'axios';

export default axios.create({
  baseURL: 'http://www.noye.xyz:3000/api/v1',
  timeout: 1000,
});
