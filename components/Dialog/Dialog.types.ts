export interface IDialogProps {
  visible: boolean;
  children?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  className?: string;
  onOK?: () => void | Promise<void>;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  footer?: React.ReactNode;
}
