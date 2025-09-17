import { useCallback } from 'react';
import cls from 'clsx';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { profiles } from '@options/stores';
import profileIcon from '@/assets/nemo.svg?inline';
import { Profile, ProxyMode } from '@options/stores/modules/profiles';
import { Message } from '@/entrypoints/background';
import styles from './app.module.css';

function setIcon(id: string) {
  const img = document.getElementById(id) as HTMLImageElement;
  if (img) {
    const canvas = new OffscreenCanvas(128, 128);
    const context = canvas.getContext('2d');
    if (context) {
      context.clearRect(0, 0, 128, 128);
      const transparent = 'rgba(0, 0, 0, 0)';
      context.fillStyle = transparent;
      context.fillRect(0, 0, 128, 128);
      context.drawImage(img, 0, 0, 128, 128);
      const imageData = context.getImageData(0, 0, 128, 128);
      browser.action.setIcon({ imageData: imageData });
    }
  }
}

const App = observer(() => {
  const { t } = useTranslation();

  const modeOptions = useMemo(() => {
    return [
      { label: t('mode.direct'), value: ProxyMode.Direct, color: '#818D7C' },
      {
        label: t('mode.system'),
        value: ProxyMode.SystemProxy,
        color: '#000000'
      }
    ];
  }, [t]);

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

      setIcon(mode);
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

      setIcon(profile.id);
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
          <img
            src={profileIcon.replace(
              /currentColor/g,
              encodeURIComponent(option.color)
            )}
            alt="Mode Icon"
            width="24"
            height="24"
            id={option.value}
          />
          <span>{option.label}</span>
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
          <img
            src={profileIcon.replace(
              /currentColor/g,
              encodeURIComponent(profile.color)
            )}
            alt="Profile Icon"
            width="24"
            height="24"
            id={profile.id}
          />
          <span>{profile.name}</span>
        </button>
      ))}
      <hr className={styles.divider} />
      <a href="./options.html" target="_blank" className={styles.optionsItem}>
        {t('common.options')}
      </a>
    </div>
  );
});

export default App;
