import { useStaticRendering } from 'mobx-react-lite';
import { useContext, Context, createContext } from 'react';
import { DrawItem } from '../type/DrawItem';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

interface Store {
  draws: Array<DrawItem> | null;
}

export class RootStore implements Partial<Store> {
  draws: DrawItem[] | null;

  constructor(storeState: Partial<Store>) {
    this.draws = storeState?.draws || null;
  }

  nextInit() {
    this.draws = [
      { name: 'abc' },
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
