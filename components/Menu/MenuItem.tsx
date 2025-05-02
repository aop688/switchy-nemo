import React from 'react';
import { NavLink } from 'react-router';
import cls from 'clsx';
import styles from './menu.module.css';
import { useMenuContext } from './context';
import { IMenuItemProps } from './Menu.types';

const MenuItem: React.FC<IMenuItemProps> = ({
  className = '',
  label,
  to,
  Icon,
  children,
  disabled = false
}) => {
  const { expanded } = useMenuContext();

  if (children) {
    return (
      <li className={cls(className, disabled && styles.disabled)}>
        {children}
      </li>
    );
  } else {
    return (
      <li
        className={cls(styles.menuItem, className, disabled && styles.disabled)}
      >
        <NavLink
          className={({ isActive }) =>
            cls(styles.menuItemLink, isActive && styles.activated)
          }
          to={to || '/'}
          tabIndex={expanded ? 0 : -1}
        >
          {Icon && <Icon className={styles.menuItemIcon} />}
          <span className={styles.menuItemLabel}>{label}</span>
        </NavLink>
      </li>
    );
  }
};

export default MenuItem;
