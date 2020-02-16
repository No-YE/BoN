import { useStaticRendering } from 'mobx-react-lite';
import { types, Instance } from 'mobx-state-tree';
import { useContext, createContext } from 'react';
import CategoryStore from './category';
import FeedStore from './feed';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

const RootStore = types
  .model({
    category: types.maybe(CategoryStore),
    feed: types.maybe(FeedStore),
  })
  .actions((self) => ({
    setCategory(): void {
      //eslint-disable-next-line no-param-reassign
      self.category = CategoryStore.create({
        isOpen: false,
        items: [
          { id: 1, name: 'typescript' },
          { id: 2, name: 'architecture' },
        ],
      });
    },
    setFeed(): void {
      //eslint-disable-next-line no-param-reassign
      self.feed = FeedStore.create({
        items: [
          //eslint-disable-next-line max-len
          {
            id: 1,
            title: '안심번호 마이크로서비스 개발하기',
            summary: '안녕하세요. 당근마켓 플랫폼 개발팀 인턴 Jerry 입니다. 이번에 당근마켓의 안심번호 마이크로서비스를 개발한 이야기를 공유하려 합니다.',
            mainImageUri: 'https://miro.medium.com/max/2452/1*GQ4TCTMaJlHJVjkYP__-3w.png',
          },
        ],
      });
    },
    nextInit(): void {
      this.setCategory();
      this.setFeed();
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
