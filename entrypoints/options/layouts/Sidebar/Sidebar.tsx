import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Menu, Form, FormValues, Rules } from '@/components';
import { useStore, Profile } from '@options/stores';
import { Settings, Save, Plus } from '@/assets/icons';
import { uuid, BYPASS_LIST } from '@/utils/misc';
import styles from './sidebar.module.css';

const Sidebar = observer(() => {
  const { profiles } = useStore();
  const navigate = useNavigate();
  const [showAddProfile, setShowAddProfile] = useState(false);
  const [profile, setProfile] = useState<FormValues>({
    id: uuid(),
    name: ''
  });
  const [valid, setValid] = useState(true);

  const profileRules: Rules = useMemo(
    () => ({
      name: [
        {
          required: true,
          message: 'The name of the profile is required.',
          trigger: ['change', 'blur']
        }
      ]
    }),
    []
  );

  const addProfile = useCallback(() => {
    setProfile({
      id: uuid(),
      name: '',
      enabled: true,
      proxyRules: 'singleProxy',
      host: 'example.com',
      scheme: 'http',
      port: 80,
      bypassList: BYPASS_LIST
    });
    setShowAddProfile(true);
  }, []);

  const saveProfile = useCallback(() => {
    if (valid) {
      profiles.addProfile(profile as Profile);
      setShowAddProfile(false);
      navigate(`/profile/${profile.id}`);
    }
  }, [profile, valid, profiles, navigate]);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <h1 className={styles.logoTitle}>Switchy Nemo</h1>
        </div>
        <nav className={styles.nav}>
          <h2 className={styles.heading}>Settings</h2>
          <Menu className={styles.menu}>
            <Menu.MenuItem label="General" to="general" Icon={Settings} />
            <Menu.MenuItem label="Import/Export" to="transfer" Icon={Save} />
          </Menu>
        </nav>
        <nav className={styles.nav}>
          <h2 className={styles.heading}>Profiles</h2>
          <button
            className={styles.addProfile}
            title="New profile"
            onClick={addProfile}
          >
            <Plus className={styles.addIcon} />
          </button>
          <Menu className={styles.menu}>
            {profiles.getProfiles.map(profile => (
              <Menu.MenuItem
                key={profile.id}
                label={profile.name}
                to={`profile/${profile.id}`}
              />
            ))}
          </Menu>
        </nav>
        <Dialog
          visible={showAddProfile}
          title={'New Profile'}
          onClose={() => setShowAddProfile(false)}
          footer={
            <div className={styles.newProfileFooter}>
              <Button
                variant="outlined"
                onClick={() => setShowAddProfile(false)}
              >
                Close
              </Button>
              <Button type="submit" form="addProfile" disabled={!valid}>
                Create
              </Button>
            </div>
          }
        >
          <div className={styles.newProfile}>
            <Form
              values={profile}
              onValuesChange={setProfile}
              onValidateChange={setValid}
              id="addProfile"
              rules={profileRules}
              onSubmit={saveProfile}
              layout="vertical"
              showRequired={false}
            >
              <Form.Item label={'Profile name'} field="name">
                <Input autoFocus />
              </Form.Item>
            </Form>
          </div>
        </Dialog>
      </div>
    </aside>
  );
});

export default Sidebar;
