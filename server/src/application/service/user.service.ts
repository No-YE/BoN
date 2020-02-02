import { UserRepository } from '~/data/repository/user.repository';
import {
  CreateUserDto, UpdateUserRoleDto, DeleteUserDto, FindUserDto,
} from '../dto/user.dto';
import {
  Either, left, right, match,
} from '~/infrastructure/lib/either';
import { User } from '~/data/entity';

export default function makeUserService(userRepository: UserRepository) {
  async function createUser(dto: CreateUserDto): Promise<Either<Error, User>> {
    const createResult = await userRepository.createUser({ ...dto });

    return match<Either<Error, User>, Error, User>(
      createResult,
      (l) => left(l),
      (r) => right(r),
    );
  }

  async function updateUserRole(dto: UpdateUserRoleDto): Promise<Either<Error, boolean>> {
    const updateRoleResult = await userRepository.updateRole({ ...dto });

    return match<Either<Error, boolean>, Error, boolean>(
      updateRoleResult,
      (l) => left(l),
      (r) => right(r),
    );
  }

  async function deleteUser(dto: DeleteUserDto): Promise<Either<Error, boolean>> {
    const deleteResult = await userRepository.deleteUser({ ...dto });

    return match<Either<Error, boolean>, Error, boolean>(
      deleteResult,
      (l) => left(l),
      (r) => right(r),
    );
  }

  async function findUser(dto: FindUserDto): Promise<Either<Error, Array<User>>> {
    const findResult = await userRepository.findUser({ ...dto });

    return match<Either<Error, Array<User>>, Error, Array<User>>(
      findResult,
      (l) => left(l),
      (r) => right(r),
    );
  }

  return {
    createUser,
    updateUserRole,
    deleteUser,
    findUser,
  };
}
