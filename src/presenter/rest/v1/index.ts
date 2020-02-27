import { Router } from 'express';
import makePostController from './post.controller';

export default function makeV1Controller(): Router {
  const router = Router();

  return router
    .use('/post', makePostController());
}
