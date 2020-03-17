import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
  ? 'http://www.noye.xyz:3000/api/v1'
  : 'http://localhost:3000/api/v1';

export default axios.create({
  baseURL,
  timeout: 1000,
});
