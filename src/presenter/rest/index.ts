import { Router } from 'express';
import makeV1Controller from './v1';

export default function makeRestController(): Router {
  const router = Router();
  return router.use('/v1', makeV1Controller());
}
