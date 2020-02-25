import { TaskEither, chain } from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import makePostRepository from '~/database/repository/post.repository';
import Post from '~/database/aggregate/post';
import {
  CraetePostDto, UpdatePostDto, DeletePostDto, SearchPostsDto, FindNewPostsDto, FindPostDto,
} from '../dto/post.dto';

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function makePostService() {
  const repository = makePostRepository();

  function createPost(dto: CraetePostDto): TaskEither<Error, null> {
    const {
      categoryNames, content, title, userId,
    } = dto;

    return pipe(
      repository.findOrCreateCategoriesByName(categoryNames),
      chain((categories) => repository.create({
        title,
        content,
        userId,
        categories,
      })),
    );
  }

  function updatePost(dto: UpdatePostDto): TaskEither<Error, null> {
    const {
      categoryNames, content, id, title,
    } = dto;

    return pipe(
      repository.findOrCreateCategoriesByName(categoryNames),
      chain((categories) => repository.update({
        categories,
        content,
        id,
        title,
      })),
    );
  }

  function deletePost(dto: DeletePostDto): TaskEither<Error, null> {
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
    return repository.findById(dto.id);
  }

  return {
    createPost,
    updatePost,
    deletePost,
    searchPosts,
    findNewPosts,
    findPost,
  };
}
