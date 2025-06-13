import cls from 'clsx';
import { observer } from 'mobx-react-lite';
import { profiles } from '@options/stores';
import { Profile, ProxyMode } from '@options/stores/modules/profiles';
import styles from './app.module.css';

const modeOptions = [
  { label: 'Direct', value: ProxyMode.Direct },
  { label: 'System Proxy', value: ProxyMode.SystemProxy }
];

const App = observer(() => {
  const selectMode = useCallback((mode: ProxyMode) => {
    profiles.setCurrentMode(mode);
    profiles.selectProfile(null);
    browser.runtime.sendMessage({
      type: 'setProxy',
      currentMode: mode,
      selectedProfile: null
    });
  }, []);

  const selectProfile = useCallback((profile: Profile) => {
    profiles.selectProfile(profile);
    browser.runtime.sendMessage({
      type: 'setProxy',
      currentMode: ProxyMode.FixedServers,
      selectedProfile: profile
    });
  }, []);

  return (
    <div className={styles.options}>
      {modeOptions.map(option => (
        <button
          key={option.value}
          className={cls(
            styles.optionsItem,
            profiles.currentMode === option.value && styles.selected
          )}
          onClick={() => selectMode(option.value)}
        >
          {option.label}
        </button>
      ))}
      <hr className={styles.divider} />
      {profiles.availableProfiles.map(profile => (
        <button
          key={profile.id}
          className={cls(
            styles.optionsItem,
            profile.id === profiles.getSelectedProfile?.id && styles.selected
          )}
          onClick={() => selectProfile(profile)}
        >
          {profile.name}
        </button>
      ))}
      <hr className={styles.divider} />
      <a href="./options.html" target="_blank" className={styles.optionsItem}>
        Options
      </a>
    </div>
  );
});

export default App;
