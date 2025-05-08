import { useParams, useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Button, Dialog } from '@/components';
import { useStore } from '@options/stores';
import styles from './profile.module.css';

const ProfileView = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profiles } = useStore();
  const [showDeleteProfile, setShowDeleteProfile] = useState(false);

  const profile = profiles.getProfileById(id as string);

  const deleteProfile = useCallback(() => {
    if (profile) {
      profiles.removeProfile(profile);
      setShowDeleteProfile(false);
      navigate('/');
    }
  }, [profile, profiles, navigate]);

  return (
    <div className={styles.profile}>
      <header className={styles.header}>
        <h1 className={styles.title}>Profile {profile?.name}</h1>
        <div className={styles.actions}>
          <Button>Save</Button>
          <Button
            variant="filled-danger"
            onClick={() => setShowDeleteProfile(true)}
          >
            Delete
          </Button>
          <Dialog
            visible={showDeleteProfile}
            title={'Delete Profile'}
            closable
            onClose={() => setShowDeleteProfile(false)}
            footer={
              <div className={styles.deleteProfileFooter}>
                <Button
                  variant="outlined"
                  onClick={() => setShowDeleteProfile(false)}
                >
                  Cancel
                </Button>
                <Button variant="filled-danger" onClick={deleteProfile}>
                  Delete
                </Button>
              </div>
            }
          >
            <div className={styles.deleteProfile}>
              <p>Do you really want to delete the following profile?</p>
              <p className={styles.deleteProfileName}>{profile?.name}</p>
            </div>
          </Dialog>
        </div>
      </header>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Proxy servers</h2>
      </section>
    </div>
  );
});

export default ProfileView;
