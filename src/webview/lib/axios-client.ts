import axios from 'axios';

export default axios.create({
  baseURL: 'http://noye.coo.kr/api/v1',
  timeout: 1000,
});
