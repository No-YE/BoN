import { TaskEither } from 'fp-ts/lib/TaskEither';
import { PostRepository } from '~/data/repository/post.repository';
import { Post } from '~/data/entity';
import {
  CraetePostDto, UpdatePostDto, DeletePostDto, SearchPostsDto, FindNewPostsDto, FindPostsByCategory, FindPostDto,
} from '../dto/post.dto';

export default function makePostService(postRepository: PostRepository) {
  function createPost(dto: CraetePostDto): TaskEither<Error, Post> {
    return postRepository.createPost({ ...dto });
  }

  function updatePost(dto: UpdatePostDto): TaskEither<Error, boolean> {
    return postRepository.updatePost({ ...dto });
  }

  function deletePost(dto: DeletePostDto): TaskEither<Error, boolean> {
    return postRepository.deletePost({ ...dto });
  }

  function searchPosts(dto: SearchPostsDto): TaskEither<Error, [Array<Post>, number]> {
    const { offset, limit, query } = dto;
    return postRepository.searchPosts({ offset, limit, query });
  }

  function findNewPosts(dto: FindNewPostsDto): TaskEither<Error, [Array<Post>, number]> {
    const { offset, limit } = dto;
    return postRepository.findNewPosts({ offset, limit });
  }

  function findPostsByCategory(dto: FindPostsByCategory): TaskEither<Error, [Array<Post>, number]> {
    const { offset, limit, categoryId } = dto;
    return postRepository.findPostsByCategory({ offset, limit, categoryId });
  }

  function findPost(dto: FindPostDto): TaskEither<Error, Post> {
    return postRepository.findPost({ ...dto });
  }

  return {
    createPost,
    updatePost,
    deletePost,
    searchPosts,
    findNewPosts,
    findPostsByCategory,
    findPost,
  };
}
