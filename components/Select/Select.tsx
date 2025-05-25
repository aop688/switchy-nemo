import React, { useCallback } from 'react';
import cls from 'clsx';
import { ISelectProps } from './Select.types';
import Option from './Option';
import styles from './select.module.css';

const Select: React.FC<ISelectProps> = props => {
  const { options, className, onSelect, ...rest } = props;

  const changeHandler = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;
      onSelect?.(selectedValue);
    },
    [onSelect]
  );

  return (
    <select
      className={cls(styles.select, className)}
      onChange={changeHandler}
      {...rest}
    >
      {options.map(option => (
        <Option key={option.value.toString()} {...option}>
          {option.label}
        </Option>
      ))}
    </select>
  );
};

export default Select;
