import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:4000/v1',
  timeout: 1000,
});
