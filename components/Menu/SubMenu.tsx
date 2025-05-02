import React, { useMemo } from 'react';
import cls from 'clsx';
import { Down } from '@/assets/icons';
import { useRandomId } from '@/hooks';
import { MenuContext, useMenuContext } from './context';
import styles from './menu.module.css';
import { ISubMenuProps } from './Menu.types';

const SubMenu: React.FC<ISubMenuProps> = ({
  className = '',
  label,
  name,
  Icon,
  children
}) => {
  const { currentMenu, updateMenu } = useMenuContext();

  const menuName = useRandomId(name);

  const expanded = useMemo(
    () => currentMenu.includes(menuName),
    [currentMenu, menuName]
  );

  const context = useMemo(
    () => ({
      currentMenu,
      expanded,
      updateMenu
    }),
    [currentMenu, expanded, updateMenu]
  );

  return (
    <li className={cls(styles.subMenu, className)}>
      <button
        type="button"
        className={styles.subMenuButton}
        onClick={() => updateMenu(menuName)}
      >
        <div className={styles.subMenuInfo}>
          {Icon && <Icon className={styles.subMenuIcon} />}
          <span className={styles.subMenuLabel}>{label}</span>
        </div>
        <Down
          className={cls(styles.subMenuArrow, {
            [styles.expanded]: expanded
          })}
        />
      </button>
      <div
        className={cls(styles.subMenuList, {
          [styles.expanded]: expanded
        })}
      >
        <ul className={styles.subMenuInner}>
          <MenuContext.Provider value={context}>
            {children}
          </MenuContext.Provider>
        </ul>
      </div>
    </li>
  );
};

export default SubMenu;
