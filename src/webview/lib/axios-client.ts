import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://www.noye.xyz/api/v1'
  : 'http://localhost:3000/api/v1';

export default axios.create({
  baseURL,
  timeout: 1000,
});
