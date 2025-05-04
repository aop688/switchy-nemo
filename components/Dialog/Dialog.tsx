import React, { useState, MouseEvent } from 'react';
import cls from 'clsx';
import { CSSTransition } from 'react-transition-group';
import { useScrollLock } from '@/hooks/useScrollLock';
import { useWindowEvent } from '@/hooks/useWindowEvent';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { eventKey } from '@/utils/keyboard';
import { Close } from '@/assets/icons';
import Button from '../Button';
import { IDialogProps } from './Dialog.types';
import Portal from '../Portal';
import styles from './dialog.module.css';

const TIMEOUT = 300;

const Dialog: React.FC<IDialogProps> = ({
  children,
  visible,
  closable = false,
  onClose,
  title,
  className,
  onOK,
  onCancel,
  okText,
  cancelText,
  footer
}) => {
  const nodeRef = React.useRef(null);
  const [loading, setLoading] = useState(false);

  const stopPropagation = (event: MouseEvent) => {
    event.stopPropagation();
  };

  useScrollLock(visible);

  useWindowEvent('keydown', event => {
    if (event.key === eventKey.Escape && visible) {
      onClose?.();
    }
  });

  const focusTrapRef = useFocusTrap(visible);

  const handleAction = async (action?: () => void | Promise<void>) => {
    try {
      setLoading(true);
      await action?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={visible}
      unmountOnExit
      timeout={TIMEOUT}
      classNames={{
        enter: styles.maskEnter,
        enterActive: styles.maskEnterActive,
        exit: styles.maskExit,
        exitActive: styles.maskExitActive
      }}
    >
      <Portal>
        <div
          className={styles.mask}
          ref={nodeRef}
          onClick={() => closable && onClose?.()}
        >
          <div
            role="dialog"
            aria-modal="true"
            className={cls(styles.dialog, className)}
            ref={focusTrapRef}
            onClick={stopPropagation}
          >
            <div className={styles.inner}>
              <div className={styles.header}>
                <div className={styles.title}>{title}</div>
                {onClose && (
                  <button onClick={onClose} className={styles.close}>
                    <Close className={styles.closeIcon} />
                  </button>
                )}
              </div>
              {children}
              {footer ? (
                footer
              ) : (
                <div className={styles.footer}>
                  {cancelText && (
                    <Button
                      variant="outlined"
                      className={styles.footerButton}
                      onClick={onCancel}
                    >
                      {cancelText}
                    </Button>
                  )}
                  {okText && (
                    <Button
                      className={styles.footerButton}
                      onClick={() => handleAction(onOK)}
                      loading={loading}
                    >
                      {okText}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Portal>
    </CSSTransition>
  );
};

export default Dialog;
