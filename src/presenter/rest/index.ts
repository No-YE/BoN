import { Router } from 'express';
import makeV1Controller from './v1';
import { UserRepository } from '~/database/repository/user.repository';
import { PostRepository } from '~/database/repository/post.repository';

export default function makeRestController(repository: {
  //userRepository: UserRepository;
  postRepository: PostRepository;
}): Router {
  const router = Router();
  return router.use('/v1', makeV1Controller(repository));
}
