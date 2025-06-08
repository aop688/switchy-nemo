import { observer } from 'mobx-react-lite';
import { Switch, List } from '@/components';
import { useStore, Profile } from '@options/stores';
import styles from './general.module.css';

const GeneralView = observer(() => {
  const { profiles } = useStore();

  const renderItem = useCallback(
    (profile: Profile) => {
      const toggleProfile = (checked: boolean) =>
        profiles.updateProfile({
          ...profile,
          enabled: checked
        });

      return (
        <div className={styles.profileItem}>
          <span className={styles.profileName}>{profile.name}</span>
          <Switch
            className={styles.profileSwitch}
            checked={profile.enabled}
            onChange={event => toggleProfile(event.currentTarget.checked)}
          />
        </div>
      );
    },
    [profiles]
  );

  return (
    <div className={styles.general}>
      <header className={styles.header}>
        <h1 className={styles.title}>General</h1>
      </header>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Profiles</h2>
        <div className={styles.sectionBody}>
          <div className={styles.sectionDescription}>
            <p>
              Profiles are used to manage different proxy servers. You can sort
              and disable profiles.
            </p>
          </div>
          <div className={styles.profiles}>
            <List
              dataSource={profiles.getProfiles}
              setList={profiles.setProfiles.bind(profiles)}
              renderItem={renderItem}
              draggable
            />
          </div>
        </div>
      </section>
    </div>
  );
});

export default GeneralView;
