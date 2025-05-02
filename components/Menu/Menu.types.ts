import React from 'react';

export interface IMenuProps {
  defaultExpandedMenu?: string[];
  children: React.ReactNode;
  accordion?: boolean;
  className?: string;
}

export interface ISubMenuProps {
  children: React.ReactNode;
  label?: string;
  name?: string;
  Icon?: React.FunctionComponent<React.ComponentProps<'svg'>>;
  className?: string;
}

export interface IMenuItemProps {
  children?: React.ReactNode;
  label?: string;
  Icon?: React.FunctionComponent<React.ComponentProps<'svg'>>;
  to?: string;
  disabled?: boolean;
  className?: string;
}

export interface MenuContextProps {
  currentMenu: string[];
  expanded: boolean;
  updateMenu: (menu: string) => void;
}
