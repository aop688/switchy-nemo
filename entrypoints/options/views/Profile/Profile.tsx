import { useParams, useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Button, Dialog, Table } from '@/components';
import { Edit } from '@/assets/icons';
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

  const editServer = useCallback((index: number) => {
    // todo
    console.log('edit server', index);
  }, []);

  const columns = [
    {
      name: 'scheme',
      label: 'Scheme'
    },
    {
      name: 'protocol',
      label: 'Protocol'
    },
    {
      name: 'server',
      label: 'Server'
    },
    {
      name: 'port',
      label: 'Port'
    },
    {
      name: 'action',
      label: 'Action',
      renderCell: (_text: string, _record: AnyLiteral, index: number) => (
        <button className={styles.editButton} onClick={() => editServer(index)}>
          <Edit className={styles.editButtonIcon} />
        </button>
      )
    }
  ];

  const dataSource = [
    {
      scheme: 'http',
      protocol: 'HTTP',
      server: 'example.com',
      port: 80
    },
    {
      scheme: 'https',
      protocol: 'HTTPS',
      server: 'example.com',
      port: 443
    },
    {
      scheme: 'socks5',
      protocol: 'SOCKS5',
      server: 'example.com',
      port: 1080
    }
  ];

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
        <div className={styles.sectionBody}>
          <Table
            columns={columns}
            dataSource={dataSource}
            className={styles.sectionTable}
          />
        </div>
      </section>
    </div>
  );
});

export default ProfileView;
