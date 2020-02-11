import makePostQueries from './post.query';
import { PostRepository } from '~/data/repository/post.repository';

export default function makeQuries(postRepository: PostRepository) {
  return {
    ...makePostQueries(postRepository),
  };
}