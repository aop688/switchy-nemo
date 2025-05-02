import React, { useContext } from 'react';
import { MenuContextProps } from './Menu.types';

export const noop = () => {};

const defaultContext = {
  currentMenu: [],
  expanded: true,
  updateMenu: noop
};

export const MenuContext =
  React.createContext<MenuContextProps>(defaultContext);

export const useMenuContext = () => useContext(MenuContext);
