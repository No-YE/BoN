import { SingletonRouter } from 'next/router';
import removeMd from 'remove-markdown';
import { StoreInstance } from '../store';
import { getPosts } from './api/post';
import { Feed } from '../type';

export default async (store: StoreInstance, Router: SingletonRouter): Promise<void> => {
  const feeds = await getPosts({ offset: 0, limit: 20 });

  store.setFeeds(feeds.data[0].map((feed: {
    id: number;
    title: string;
    content: string;
    createdAt: string;
  }): Feed => ({
    id: feed.id,
    title: feed.title,
    summary: removeMd(feed.content.substring(0, 300)),
    createdAt: new Date(feed.createdAt),
  })));

  store.category?.changeOpen(false);

  Router.push('/');
};
