import { Button } from '@/components';
import styles from './general.module.css';

const GeneralView = () => {
  return (
    <div className={styles.general}>
      <header className={styles.header}>
        <h1 className={styles.title}>General</h1>
        <div className={styles.actions}>
          <Button loading>Save</Button>
          <Button variant="filled-danger" loading>
            Delete
          </Button>
        </div>
      </header>
    </div>
  );
};

export default GeneralView;
