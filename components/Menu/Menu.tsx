import React, { useCallback, useMemo, useState } from 'react';
import cls from 'clsx';
import { MenuContext } from './context';
import styles from './menu.module.css';
import { IMenuProps } from './Menu.types';

const Menu: React.FC<IMenuProps> = ({
  defaultExpandedMenu = [],
  accordion = false,
  className = '',
  children
}) => {
  const [menu, setMenu] = useState<string[]>(defaultExpandedMenu);
  const updateMenu = useCallback(
    (name: string) => {
      const index = menu.indexOf(name);
      if (accordion) {
        if (index > -1) {
          setMenu([]);
        } else {
          setMenu([name]);
        }
      } else {
        if (index > -1) {
          setMenu(prevMenu => {
            const newMenu = [...prevMenu];
            newMenu.splice(index, 1);
            return newMenu;
          });
        } else {
          setMenu(prevMenu => [...prevMenu, name]);
        }
      }
    },
    [accordion, menu]
  );
  const context = useMemo(
    () => ({
      currentMenu: menu,
      expanded: true,
      updateMenu
    }),
    [menu, updateMenu]
  );

  return (
    <nav className={cls(styles.menu, className)}>
      <ul className={styles.menuInner}>
        <MenuContext.Provider value={context}>{children}</MenuContext.Provider>
      </ul>
    </nav>
  );
};

export default Menu;
