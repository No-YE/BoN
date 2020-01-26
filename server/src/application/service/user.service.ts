import { UserRepository } from '~/data/repository/user.repository';
import { CreateUserDto } from '../dto/user.dto';
import { Either, isLeft, left, right } from '~/infrastructure/lib/either';
import { User } from '~/data/entity';

export function makeUserService(userRepository: UserRepository) {
  return {
    createUser,
  };

  async function createUser(dto: CreateUserDto): Promise<Either<Error, User>> {
    const createResult = await userRepository.createUser({ ...dto });

    if (isLeft(createResult)) {
      return left(createResult.value);
    }

    return right(createResult.value);
  }
}
