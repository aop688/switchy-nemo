import { forwardRef, useCallback, useEffect, useMemo } from 'react';
import cls from 'clsx';
import styles from './message.module.css';
import { IToastProps } from './Message.types';
import { Info, Success, Error, Warning, Loading, Close } from '@/assets/icons';

const typeToIcon = {
  info: Info,
  success: Success,
  error: Error,
  warning: Warning,
  loading: Loading
};

const Toast = forwardRef<HTMLDivElement, IToastProps>(
  ({ content, type, duration, remove, toastId }, ref) => {
    const IconComponent = typeToIcon[type];
    const onClose = useCallback(() => {
      remove(toastId);
    }, [remove, toastId]);

    useEffect(() => {
      let timer: ReturnType<typeof setTimeout> | null = null;

      if (duration) {
        timer = setTimeout(onClose, duration * 1000);
      }

      return () => {
        if (timer) clearTimeout(timer);
      };
    }, [duration, onClose]);

    const canClose = useMemo(() => duration === 0 || duration > 5, [duration]);

    return (
      <div role="alert" className={styles.toast} ref={ref}>
        {IconComponent && (
          <div className={styles.iconWrapper}>
            <IconComponent className={cls(styles.icon, styles[type])} />
          </div>
        )}
        <span className={styles.text}>{content}</span>
        {canClose && (
          <button onClick={onClose} className={styles.close}>
            <Close className={styles.closeIcon} />
          </button>
        )}
      </div>
    );
  }
);

export default Toast;
