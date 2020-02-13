import { Router } from 'express';
import makeV1Controller from './v1';
import { UserRepository } from '~/data/repository/user.repository';

export default function makeRestController(userRepository: UserRepository) {
  const router = Router();
  return router.use('/api', makeV1Controller(userRepository));
}