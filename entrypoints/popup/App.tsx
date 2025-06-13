import { useCallback } from 'react';
import cls from 'clsx';
import { observer } from 'mobx-react-lite';
import { profiles } from '@options/stores';
import { Profile, ProxyMode } from '@options/stores/modules/profiles';
import { Message } from '@/entrypoints/background';
import styles from './app.module.css';

const modeOptions = [
  { label: 'Direct', value: ProxyMode.Direct },
  { label: 'System Proxy', value: ProxyMode.SystemProxy }
];

const App = observer(() => {
  const sendMessage = useCallback((message: Message) => {
    browser.runtime.sendMessage(message).then(response => {
      if (response?.success) {
        browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
          if (tabs.length > 0) {
            const tabId = tabs[0].id;
            if (tabId) {
              browser.tabs.reload(tabId);
            }
          }
        });
        window.close();
      }
    });
  }, []);

  const selectMode = useCallback(
    (mode: ProxyMode) => {
      profiles.setCurrentMode(mode);
      profiles.selectProfile(null);

      sendMessage({
        type: 'setProxy',
        currentMode: mode,
        selectedProfile: null
      });
    },
    [sendMessage]
  );

  const selectProfile = useCallback(
    (profile: Profile) => {
      profiles.selectProfile(profile);

      sendMessage({
        type: 'setProxy',
        currentMode: ProxyMode.FixedServers,
        selectedProfile: profile
      });
    },
    [sendMessage]
  );

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
