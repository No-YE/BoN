/*eslint-disable no-param-reassign*/
import { useStaticRendering } from 'mobx-react-lite';
import { types, Instance } from 'mobx-state-tree';
import { useContext, createContext } from 'react';
import removeMd from 'remove-markdown';
import CategoryStore from './category';
import FeedStore from './feed';
import UserStore from './user';
import PostStore from './post';
import { getPosts, getAllCategories } from '../lib/api/post';
import { Feed, Category } from '../type';
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
    setCategory(categories: Array<Category>): void {
      self.category = CategoryStore.create({
        isOpen: false,
        items: categories,
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
      this.setUser(user);
      this.setPost();

      const categories = await getAllCategories();
      this.setCategory(categories.data[0]);

      const feeds = await getPosts({ offset: 0, limit: 10 });
      this.setFeeds(feeds.data[0].map((post: {
        id: number;
        title: string;
        content: string;
        createdAt: string;
        categories: Array<Category>;
      }): Feed => ({
        id: post.id,
        title: post.title,
        summary: removeMd(post.content.substring(0, 300)),
        createdAt: new Date(post.createdAt),
        categories: post.categories,
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
