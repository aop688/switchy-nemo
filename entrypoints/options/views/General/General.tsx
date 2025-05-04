import { Button, Dialog } from '@/components';
import styles from './general.module.css';

const GeneralView = () => {
  const [visible, setVisible] = useState(false);
  const showMessage = () => {
    setVisible(true);
  };
  return (
    <div className={styles.general}>
      <header className={styles.header}>
        <h1 className={styles.title}>General</h1>
        <div className={styles.actions}>
          <Button onClick={showMessage}> Save</Button>
          <Button variant="outlined">Cancel</Button>
          <Button variant="filled-danger">Delete</Button>
        </div>
        <Dialog
          visible={visible}
          title={'Dialog Title'}
          onOK={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          onClose={() => setVisible(false)}
          closable
          okText={'Confirm'}
          cancelText={'Close'}
        >
          <div className={styles.dialog}>{'Dialog Body Content'}</div>
        </Dialog>
      </header>
    </div>
  );
};

export default GeneralView;
