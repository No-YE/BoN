import { UserRepository } from '~/data/repository/user.repository';
import { CreateUserDto, UpdateUserRoleDto } from '../dto/user.dto';
import { Either, isLeft, left, right } from '~/infrastructure/lib/either';
import { User } from '~/data/entity';

export function makeUserService(userRepository: UserRepository) {
  return {
    createUser,
    updateUserRole,
  };

  async function createUser(dto: CreateUserDto): Promise<Either<Error, User>> {
    const createResult = await userRepository.createUser({ ...dto });

    if (isLeft(createResult)) {
      return left(createResult.value);
    }

    return right(createResult.value);
  }

  async function updateUserRole(dto: UpdateUserRoleDto): Promise<Either<Error, boolean>> {
    const { id, role } = dto;
    const updateRoleResult = await userRepository.updateRole(id, role);

    if (isLeft(updateRoleResult)) {
      return left(updateRoleResult.value);
    }

    return right(updateRoleResult.value);
  }
}
