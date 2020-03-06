import { SingletonRouter } from 'next/router';
import removeMd from 'remove-markdown';
import { StoreInstance } from '../store';
import { getPosts, getAllCategories } from './api/post';
import { Feed, Category } from '../type';

export default async (store: StoreInstance, Router: SingletonRouter, path?: string): Promise<void> => {
  const feeds = await getPosts({ offset: 0, limit: 20 });
  const categories = await getAllCategories();

  store.setFeeds(feeds.data[0].map((feed: {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    categories: Array<Category>;
  }): Feed => ({
    id: feed.id,
    title: feed.title,
    summary: removeMd(feed.content.substring(0, 300)),
    createdAt: new Date(feed.createdAt),
    categories: feed.categories,
  })));

  store.setCategory(categories.data[0]);

  Router.push(path ?? '/');
};
