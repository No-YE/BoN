import { TaskEither } from 'fp-ts/lib/TaskEither';
import { PostRepository } from '~/data/repository/post.repository';
import { Post } from '~/data/entity';
import {
  CraetePostDto, UpdatePostDto, DeletePostDto, findPostsDto, findPostDto,
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

  function findPosts(dto: findPostsDto): TaskEither<Error, [Array<Post>, number]> {
    const { offset, limit, query } = dto;
    return postRepository.findPosts({ offset, limit, query });
  }

  function findPost(dto: findPostDto): TaskEither<Error, Post> {
    return postRepository.findPost({ ...dto });
  }
  
  return {
    createPost,
    updatePost,
    deletePost,
    findPosts,
    findPost,
  };
}
