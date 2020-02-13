import { Router } from 'express';
import makeUserController from './user.controller';
import { UserRepository } from '~/data/repository/user.repository';

export default function makeV1Controller(userRepository: UserRepository) {
  const router = Router();
  return router.use('/user', makeUserController(userRepository));
}