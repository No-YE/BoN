import { UpdateResult } from 'typeorm';
import {
  TaskEither, chain, map, fromOption, right,
} from 'fp-ts/lib/TaskEither';
import { fromNullable, Option } from 'fp-ts/lib/Option';
import { fold as bFold } from 'fp-ts/lib/boolean';
import { pipe } from 'fp-ts/lib/pipeable';
import { LeafObject } from 'express-sitemap-xml';
import makePostRepository from '~/domain/repository/post.repository';
import { Post, Category } from '~/domain/aggregate/post';
import {
  CraetePostDto, UpdatePostDto, DeletePostDto, SearchPostsDto, FindNewPostsDto, FindPostDto, FindByCategory,
} from '../dto/post.dto';
import Error from '~/lib/error';
import { UserRole } from '~/type';
import voidValue from '~/lib/void';

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function makePostService() {
  const repository = makePostRepository();

  function createPost(dto: CraetePostDto): TaskEither<Error, Post> {
    const {
      categoryNames, content, title, userId, thumbnail,
    } = dto;

    return pipe(
      categoryNames.map((name) => ({ name })),
      repository.findOrCreateCategories,
      chain((categories) => repository.create({
        title,
        content,
        userId,
        thumbnail,
      }, categories)),
    );
  }

  function updatePost(dto: UpdatePostDto): TaskEither<Error, Post> {
    const {
      categoryNames, content, id, title, thumbnail, userId,
    } = dto;

    return pipe(
      categoryNames.map((name) => ({ name })),
      repository.findOrCreateCategories,
      chain((categories) => repository.update({
        content,
        id,
        title,
        thumbnail,
        userId,
      }, categories)),
    );
  }

  function deletePost(dto: DeletePostDto): TaskEither<Error, UpdateResult> {
    return repository.remove(dto.id);
  }

  function searchPosts(dto: SearchPostsDto): TaskEither<Error, [Array<Post>, number]> {
    const { take, skip, query } = dto;
    return repository.findByQuery({ take, skip }, query);
  }

  function findNewPosts(dto: FindNewPostsDto): TaskEither<Error, [Array<Post>, number]> {
    return repository.findRecent({ ...dto });
  }

  function findPost(dto: FindPostDto): TaskEither<Error, Post> {
    return pipe(
      addViews(dto.id, dto.userRole),
      chain(() => repository.findById(dto.id)),
      map(fromNullable),
      chain<Error, Option<Post>, Post>(fromOption(Error.of)),
    );
  }

  function addViews(id: number, userRole?: UserRole): TaskEither<Error, void> {
    return bFold(
      () => repository.addViews(id),
      () => right(voidValue),
    )(userRole === 'admin');
  }

  function findByCategory(dto: FindByCategory): TaskEither<Error, [Array<Post>, number]> {
    const { take, skip, categoryId } = dto;
    return repository.findByCategory({ take, skip }, categoryId);
  }

  function findAllCategories(): TaskEither<Error, [Array<Category>, number]> {
    return repository.findAllCategories();
  }

  function findAllIdUrl(): TaskEither<Error, Array<LeafObject>> {
    return pipe(
      repository.findAllIds(),
      map((posts) => posts.map((p) => ({ url: `/post/${p.id}` }))),
    );
  }

  return {
    createPost,
    updatePost,
    deletePost,
    searchPosts,
    findNewPosts,
    findPost,
    findByCategory,
    findAllCategories,
    findAllIdUrl,
  };
}
