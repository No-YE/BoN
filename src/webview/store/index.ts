import { useStaticRendering } from 'mobx-react-lite';
import { types, Instance } from 'mobx-state-tree';
import { useContext, createContext } from 'react';
import CategoryStore from './category';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

const RootStore = types
  .model({
    category: types.maybe(CategoryStore),
  })
  .actions((self) => ({
    setCategory(): void {
      //eslint-disable-next-line no-param-reassign
      self.category = CategoryStore.create({
        isOpen: false,
        items: [],
      });
    },
    nextInit(): void {
      this.setCategory();
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
