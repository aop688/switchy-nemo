import React, { useContext } from 'react';
import { noop } from '@/utils/misc';
import { MenuContextProps } from './Menu.types';

const defaultContext = {
  currentMenu: [],
  expanded: true,
  updateMenu: noop
};

export const MenuContext =
  React.createContext<MenuContextProps>(defaultContext);

export const useMenuContext = () => useContext(MenuContext);
