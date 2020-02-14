import { useStaticRendering } from 'mobx-react-lite';
import { useContext, Context, createContext } from 'react';
import { Category } from '../type/Category';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

interface Store {
  categories: Array<Category> | null;
}

export class RootStore implements Partial<Store> {
  categories: Array<Category> | null;

  constructor(storeState: Partial<Store>) {
    this.categories = storeState?.categories || null;
  }

  nextInit() {
    this.categories = [
      { id: 1, name: 'typescript' },
      { id: 2, name: 'grpc' },
      { id: 3, name: '잡다한 것들' },
      { id: 4, name: '일상' },
    ];
  }
}

let store: RootStore;

export default (storeState: Partial<Store>) => {
  if (isServer) {
    return new RootStore(storeState);
  }
  return store ?? (store = new RootStore(storeState));
}

export const StoreContext = createContext({} as Store);
export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);
