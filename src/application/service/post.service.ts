import { UpdateResult } from 'typeorm';
import {
  TaskEither, chain, map, fromOption,
} from 'fp-ts/lib/TaskEither';
import { fromNullable, Option } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import makePostRepository from '~/domain/repository/post.repository';
import Post, { Category } from '~/domain/aggregate/post';
import {
  CraetePostDto, UpdatePostDto, DeletePostDto, SearchPostsDto, FindNewPostsDto, FindPostDto,
} from '../dto/post.dto';
import Error from '~/lib/error';

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function makePostService() {
  const repository = makePostRepository();

  function createPost(dto: CraetePostDto): TaskEither<Error, Post> {
    const {
      categoryNames, content, title, userId,
    } = dto;

    return pipe(
      categoryNames.map((name) => ({ name })),
      repository.findOrCreateCategories,
      chain((categories) => repository.create({
        title,
        content,
        userId,
        categories,
      })),
    );
  }

  function updatePost(dto: UpdatePostDto): TaskEither<Error, UpdateResult> {
    const {
      categoryNames, content, id, title,
    } = dto;

    return pipe(
      categoryNames.map((name) => ({ name })),
      repository.findOrCreateCategories,
      chain((categories) => repository.update({
        categories,
        content,
        id,
        title,
      })),
    );
  }

  function deletePost(dto: DeletePostDto): TaskEither<Error, UpdateResult> {
    return repository.remove(dto.id);
  }

  function searchPosts(dto: SearchPostsDto): TaskEither<Error, [Array<Post>, number]> {
    const { take, limit, query } = dto;
    return repository.findByQuery({ take, limit }, query);
  }

  function findNewPosts(dto: FindNewPostsDto): TaskEither<Error, [Array<Post>, number]> {
    return repository.findRecent({ ...dto });
  }

  function findPost(dto: FindPostDto): TaskEither<Error, Post> {
    return pipe(
      repository.findById(dto.id),
      map(fromNullable),
      chain<Error, Option<Post>, Post>(fromOption(Error.of)),
    );
  }

  function findAllCategories(): TaskEither<Error, [Array<Category>, number]> {
    return repository.findAllCategories();
  }

  return {
    createPost,
    updatePost,
    deletePost,
    searchPosts,
    findNewPosts,
    findPost,
    findAllCategories,
  };
}
