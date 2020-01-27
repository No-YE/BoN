import { UserRepository } from '~/data/repository/user.repository';
import { CreateUserDto, UpdateUserRoleDto, DeleteUserDto } from '../dto/user.dto';
import { Either, isLeft, left, right } from '~/infrastructure/lib/either';
import { User } from '~/data/entity';

export function makeUserService(userRepository: UserRepository) {
  return {
    createUser,
    updateUserRole,
    deleteUser,
  };

  async function createUser(dto: CreateUserDto): Promise<Either<Error, User>> {
    const createResult = await userRepository.createUser({ ...dto });

    if (isLeft(createResult)) {
      return left(createResult.value);
    }

    return right(createResult.value);
  }

  async function updateUserRole(dto: UpdateUserRoleDto): Promise<Either<Error, boolean>> {
    const updateRoleResult = await userRepository.updateRole({ ...dto });

    if (isLeft(updateRoleResult)) {
      return left(updateRoleResult.value);
    }

    return right(updateRoleResult.value);
  }

  async function deleteUser(dto: DeleteUserDto): Promise<Either<Error, boolean>> {
    const deleteResult = await userRepository.deleteUser({ ...dto });

    if (isLeft(deleteResult)) {
      return left(deleteResult.value);
    }

    return right(deleteResult.value);
  }
}
