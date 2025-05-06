import { useParams } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Button } from '@/components';
import { useStore } from '@options/stores';
import styles from './profile.module.css';

const ProfileView = observer(() => {
  const { id } = useParams();
  const { profiles } = useStore();

  const profile = profiles.getProfileById(id as string);

  return (
    <div className={styles.profile}>
      <header className={styles.header}>
        <h1 className={styles.title}>Profile {profile?.name}</h1>
        <div className={styles.actions}>
          <Button>Save</Button>
          <Button variant="filled-danger">Delete</Button>
        </div>
      </header>
    </div>
  );
});

export default ProfileView;
