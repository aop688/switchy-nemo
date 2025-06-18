import React from 'react';
import cls from 'clsx';
import styles from './color.module.css';

export type IColorPickerProps = {
  color?: string;
  onChange?: (color: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

const ColorPicker: React.FC<IColorPickerProps> = ({
  className = '',
  color = '#0078d4',
  onChange = () => {},
  ...rest
}) => {
  return (
    <input
      type="color"
      value={color}
      className={cls(styles.colorPicker, className)}
      onChange={e => onChange(e.target.value)}
      {...rest}
    />
  );
};

export default ColorPicker;
