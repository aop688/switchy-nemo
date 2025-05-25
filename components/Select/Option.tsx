import React from 'react';
import cls from 'clsx';
import styles from './select.module.css';
import { IOptionProps } from './Select.types';

const Option: React.FC<IOptionProps> = ({ children, className, ...rest }) => {
  return (
    <option className={cls(styles.option, className)} {...rest}>
      {children}
    </option>
  );
};

export default Option;
