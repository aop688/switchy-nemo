import { Button } from '@/components';
import styles from './general.module.css';

const GeneralView = () => {
  return (
    <div className={styles.general}>
      <header className={styles.header}>
        <h1 className={styles.title}>General</h1>
        <div className={styles.actions}>
          <Button>Save</Button>
          <Button variant="outlined">Cancel</Button>
          <Button variant="filled-danger">Delete</Button>
        </div>
      </header>
    </div>
  );
};

export default GeneralView;
