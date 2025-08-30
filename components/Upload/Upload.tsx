import React, { useCallback, useRef, memo } from 'react';
import cls from 'clsx';
import Button from '../Button';
import styles from './upload.module.css';
import { IUploadProps } from './Upload.types';

const Upload: React.FC<IUploadProps> = ({
  children,
  onUpload,
  className,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const triggerUpload = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const changeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;
      if (files) {
        onUpload?.(files);
      }
    },
    [onUpload]
  );

  return (
    <div className={styles.upload}>
      <input
        type="file"
        ref={inputRef}
        onChange={changeHandler}
        className={styles.input}
        {...rest}
      />
      <Button
        variant="outlined"
        className={cls(styles.button, className)}
        onClick={triggerUpload}
      >
        {children}
      </Button>
    </div>
  );
};

export default memo(Upload);
