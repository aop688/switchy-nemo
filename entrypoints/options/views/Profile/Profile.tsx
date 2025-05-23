import { useParams, useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Dialog,
  Table,
  Form,
  FormValues,
  Rules,
  Link
} from '@/components';
import { Edit } from '@/assets/icons';
import { BYPASS_LIST } from '@/utils/misc';
import { useStore, Profile } from '@options/stores';
import styles from './profile.module.css';

const ProfileView = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profiles } = useStore();
  const [showDeleteProfile, setShowDeleteProfile] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const profile = profiles.getProfileById(id as string);

  const [currentProfile, setCurrentProfile] = useState<FormValues>({});

  const [bypassList, setBypassList] = useState('');

  const [valid, setValid] = useState(true);
  const profileRules: Rules = {
    name: [
      {
        required: true,
        message: 'The name of the profile is required.',
        trigger: ['change', 'blur']
      }
    ]
  };
  const updateProfile = useCallback(() => {
    if (valid) {
      profiles.updateProfile(currentProfile as Profile);
      setShowEditProfile(false);
    }
  }, [valid, currentProfile, profiles]);

  const deleteProfile = useCallback(() => {
    if (profile) {
      profiles.removeProfile(profile);
      setShowDeleteProfile(false);
      navigate('/');
    }
  }, [profile, profiles, navigate]);

  const editServer = useCallback((index: number) => {
    console.log('Edit server', index);
    setShowEditProfile(true);
  }, []);

  const columns = [
    {
      name: 'proxyRules',
      label: 'Proxy rule'
    },
    {
      name: 'scheme',
      label: 'Scheme'
    },
    {
      name: 'host',
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

  useEffect(() => {
    if (bypassList) {
      const list = bypassList.split('\n').map(item => item.trim());
      setCurrentProfile(prevProfile => ({
        ...prevProfile,
        bypassList: list.filter(item => item.length > 0)
      }));
    }
  }, [bypassList]);

  useEffect(() => {
    if (profile) {
      setCurrentProfile(profile);
      setBypassList(profile?.bypassList?.join('\n') || BYPASS_LIST.join('\n'));
    }
  }, [profile]);

  return (
    <div className={styles.profile}>
      <header className={styles.header}>
        <h1 className={styles.title}>Profile {profile?.name}</h1>
        <div className={styles.actions}>
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
            dataSource={[currentProfile]}
            className={styles.sectionTable}
          />
          <Dialog
            visible={showEditProfile}
            title={'Edit Profile'}
            onClose={() => setShowEditProfile(false)}
            footer={
              <div className={styles.editProfileFooter}>
                <Button
                  variant="outlined"
                  onClick={() => setShowEditProfile(false)}
                >
                  Close
                </Button>
                <Button type="submit" form="editProfile" disabled={!valid}>
                  Update
                </Button>
              </div>
            }
          >
            <div className={styles.editProfile}>
              <Form
                values={currentProfile}
                onValuesChange={setCurrentProfile}
                onValidateChange={setValid}
                id="editProfile"
                rules={profileRules}
                onSubmit={updateProfile}
                layout="vertical"
                showRequired={false}
              >
                <Form.Item label={'Profile name'} field="name">
                  <Input autoFocus />
                </Form.Item>
                <Form.Item label={'Proxy rule'} field="proxyRules">
                  <Input disabled />
                </Form.Item>
                <Form.Item label={'Scheme'} field="scheme">
                  <Input />
                </Form.Item>
                <Form.Item label={'Server'} field="host">
                  <Input />
                </Form.Item>
                <Form.Item label={'Port'} field="port">
                  <Input />
                </Form.Item>
              </Form>
            </div>
          </Dialog>
        </div>
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Bypass List</h2>
        <div className={styles.sectionBody}>
          <div className={styles.sectionDescription}>
            <p>
              Servers for which you do not want to use any proxy: (One server on
              each line.)
            </p>
            <Link href="https://developer.chrome.com/docs/extensions/reference/api/proxy#bypass_list">
              (Wildcards and more available…)
            </Link>
          </div>
          <Textarea
            rows={10}
            className={styles.sectionTextarea}
            value={bypassList}
            onChange={e => setBypassList(e.target.value)}
          />
        </div>
      </section>
    </div>
  );
});

export default ProfileView;
