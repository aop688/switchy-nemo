import React from 'react';
import profiles, { Profile } from './modules/profiles';

export type RootStore = {
  profiles: typeof profiles;
};

export const store: RootStore = {
  profiles
};

const StoreContext = React.createContext<RootStore>(store);

export const StoreProvider = StoreContext.Provider;

export const useStore = () => React.useContext(StoreContext);

export { profiles };
export type { Profile };
