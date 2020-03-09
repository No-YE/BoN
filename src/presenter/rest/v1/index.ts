import { Router } from 'express';
import makeUserController from './user.controller';
import makePostController from './post.controller';
import makeCategoryController from './category.controller';
import makeImageController from './image.controller';

export default function makeV1Controller(): Router {
  const router = Router();

  return router
    .use('/user', makeUserController())
    .use('/post', makePostController())
    .use('/image', makeImageController())
    .use('/category', makeCategoryController());
}
