import { register } from 'tsconfig-paths';

register({
  baseUrl: './dist',
  paths: {
    '~/*': ['./*'],
  },
});
