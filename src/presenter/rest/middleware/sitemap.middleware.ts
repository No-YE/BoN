import expressSitemapXml, { LeafObject } from 'express-sitemap-xml';
import { pipe } from 'fp-ts/lib/pipeable';
import { fold } from 'fp-ts/lib/TaskEither';
import { of } from 'fp-ts/lib/Task';
import { Request, Response, NextFunction } from 'express';
import makePostService from '~/application/service/post.service';

export default (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const postService = makePostService();
  const rootUrl: LeafObject = { url: '/' };

  return pipe(
    postService.findAllIdUrl(),
    fold(
      (error) => of(next(error)),
      (urls) => of(
        expressSitemapXml(() => [rootUrl].concat(urls), 'https://www.noye.xyz')(req, res, next),
      ),
    ),
  )();
};
