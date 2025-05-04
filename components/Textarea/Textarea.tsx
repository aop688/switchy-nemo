import React, { useMemo, useEffect, useState, useCallback } from 'react';
import cls from 'clsx';
import { ITextareaProps } from './Textarea.types';
import styles from './textarea.module.css';

const Textarea: React.FC<ITextareaProps> = ({
  className = '',
  defaultValue = '',
  value,
  onChange,
  onBlur,
  withTrim = true,
  invalid = false,
  rows = 4,
  ...rest
}) => {
  const [selfValue, setSelfValue] = useState(defaultValue);

  const isControlledComponent = useMemo(() => value !== undefined, [value]);

  useEffect(() => {
    if (isControlledComponent) {
      setSelfValue(value as string);
    }
  }, [isControlledComponent, value]);

  const controlledValue = isControlledComponent
    ? { value: selfValue }
    : { defaultValue };

  const textareaProps = {
    ...rest,
    ...controlledValue
  };

  const changeHandler = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setSelfValue(event.target.value);
      onChange?.(event);
    },
    [onChange]
  );

  const blurHandler = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      if (withTrim) {
        const value = event.target.value;
        const trimmedValue = value.replace(/^\s+|\s+$/g, '');
        setSelfValue(trimmedValue);
        onChange?.({
          ...event,
          target: { ...event.target, value: trimmedValue }
        });
      }
      onBlur?.(event);
    },
    [onChange, onBlur, withTrim]
  );

  return (
    <textarea
      className={cls(
        styles.textarea,
        {
          [styles.invalid]: invalid
        },
        className
      )}
      rows={rows}
      {...textareaProps}
      onChange={changeHandler}
      onBlur={blurHandler}
    ></textarea>
  );
};

export default Textarea;
