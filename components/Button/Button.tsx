import React, { forwardRef } from 'react';
import cls from 'clsx';
import { NavLink } from 'react-router';
import { Loading } from '@/assets/icons';
import styles from './button.module.css';
import { IButtonProps } from './Button.types';

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      children,
      variant = 'filled',
      size = 'medium',
      loading = false,
      type = 'button',
      disabled = false,
      selected = false,
      className = '',
      to,
      relative,
      target,
      ...rest
    }: IButtonProps,
    ref
  ) => {
    const disableState = React.useMemo(
      () => disabled || loading,
      [disabled, loading]
    );
    if (to && !disableState) {
      return (
        <NavLink
          className={cls(
            styles.button,
            styles[size],
            styles[variant],
            {
              [styles.selected]: selected
            },
            className
          )}
          to={to}
          target={target}
          relative={relative}
        >
          {children}
        </NavLink>
      );
    } else {
      return (
        <button
          ref={ref}
          type={type}
          disabled={disableState}
          className={cls(
            styles.button,
            styles[size],
            styles[variant],
            {
              [styles.selected]: selected
            },
            className
          )}
          {...rest}
        >
          {loading && <Loading className={styles.icon} />}
          {children}
        </button>
      );
    }
  }
);

export default Button;
