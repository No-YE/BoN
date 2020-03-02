/*eslint-disable no-param-reassign*/
import { useStaticRendering } from 'mobx-react-lite';
import { types, Instance } from 'mobx-state-tree';
import { useContext, createContext } from 'react';
import CategoryStore from './category';
import FeedStore from './feed';
import UserStore from './user';
import PostStore from './post';
import { getPosts } from '../lib/api/post';
import { Feed } from '../type';
import { UserSession } from '~/type';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

const RootStore = types
  .model({
    category: types.maybe(CategoryStore),
    feed: types.maybe(FeedStore),
    post: types.maybe(PostStore),
    user: types.maybe(UserStore),
  })
  .actions((self) => ({
    setCategory(): void {
      self.category = CategoryStore.create({
        isOpen: false,
        items: [
          { id: 1, name: 'typescript' },
          { id: 2, name: 'architecture' },
        ],
      });
    },
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFeeds(feeds: any): void {
      self.feed = FeedStore.create({
        items: feeds,
      });
    },
    setUser(user?: UserSession): void {
      if (user) {
        self.user = UserStore.create(user);
      }
    },
    setPost(): void {
      self.post = PostStore.create({
        title: '',
        content: '',
      });
    },
    async nextInit(user: UserSession): Promise<void> {
      this.setCategory();
      this.setUser(user);
      this.setPost();

      const feeds = await getPosts({ offset: 0, limit: 10 });
      this.setFeeds(feeds.data[0].map((post: {
        id: number;
        title: string;
        content: string;
        createdAt: string;
      }): Feed => ({
        id: post.id,
        title: post.title,
        summary: post.content.substring(0, 200),
        createdAt: new Date(post.createdAt),
      })));
    },
  }));

export type Store = typeof RootStore.Type;
type StoreState = typeof RootStore.CreationType;

let store: Store;

export function createStore(storeState: StoreState): Store {
  if (isServer) {
    return RootStore.create(storeState);
  }

  //eslint-disable-next-line no-return-assign
  return store || (store = RootStore.create(storeState));
}

export type StoreInstance = Instance<Store>;

const StoreContext = createContext<StoreInstance>({} as StoreInstance);

export const StoreProvider = StoreContext.Provider;

export function useStore(): StoreInstance {
  return useContext(StoreContext);
}
