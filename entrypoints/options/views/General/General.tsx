import { Button, message } from '@/components';
import styles from './general.module.css';

const GeneralView = () => {
  const showMessage = () => {
    message.success('This is a success message');
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
      </header>
    </div>
  );
};

export default GeneralView;
