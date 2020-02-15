import { useStaticRendering } from 'mobx-react-lite';
import { useContext, createContext } from 'react';
import CategoryStore from './category';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

interface Store {
  category: CategoryStore | null;
}

export class RootStore implements Partial<Store> {
  category: CategoryStore | null;

  constructor(storeState: Partial<Store>) {
    this.category = storeState?.category || null;
  }

  nextInit(): void {
    this.category = {
      isOpen: true,
      categories: [
        { id: 1, name: 'typescript' },
        { id: 2, name: 'grpc' },
        { id: 3, name: '잡다한 것들' },
        { id: 4, name: '일상' },
      ],
    };
  }
}

let store: RootStore;

export default (storeState: Partial<Store>): RootStore => {
  if (isServer) {
    return new RootStore(storeState);
  }
  //eslint-disable-next-line no-return-assign
  return store ?? (store = new RootStore(storeState));
};

export const StoreContext = createContext({} as Store);
export const StoreProvider = StoreContext.Provider;
export const useStore = (): Store => useContext(StoreContext);
