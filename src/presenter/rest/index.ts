import { Router } from 'express';
import makeV1Controller from './v1';
import { UserRepository } from '~/data/repository/user.repository';
import { PostRepository } from '~/data/repository/post.repository';

export default function makeRestController(repository: {
  userRepository: UserRepository;
  postRepository: PostRepository;
}): Router {
  const router = Router();
  return router.use('/api', makeV1Controller(repository));
}
