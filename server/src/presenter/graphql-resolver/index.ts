import makeQueries from './query';
import * as types from './type';
import { PostRepository } from '~/data/repository/post.repository';

export default function makeResolvers(postRepository: PostRepository) {
  return {
    ...types,
    ...makeQueries(postRepository),
  };
}