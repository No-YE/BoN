import { Router } from 'express';
import makeUserController from './user.controller';
import makePostController from './post.controller';
import { UserRepository } from '~/data/repository/user.repository';
import { PostRepository } from '~/data/repository/post.repository';

export default function makeV1Controller(repository: {
  userRepository: UserRepository;
  postRepository: PostRepository;
}): Router {
  const router = Router();

  return router
    .use('/user', makeUserController(repository.userRepository))
    .use('/post', makePostController(repository.postRepository));
}
