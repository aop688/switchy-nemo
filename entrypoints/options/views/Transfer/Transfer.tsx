import { useTranslation } from 'react-i18next';
import { message, Button, Upload } from '@/components';
import { useStore } from '@options/stores';
import { downloadFile } from '@/utils/misc';
import styles from './transfer.module.css';

const TransferView = () => {
  const { profiles } = useStore();
  const { t } = useTranslation();

  const backupSettings = useCallback(() => {
    const data = profiles.exportProfiles();
    downloadFile('switchy-nemo-options.bak', data);
  }, [profiles]);

  const restoreSettings = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const file = files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        try {
          const data = JSON.parse(reader.result as string);
          profiles.setProfiles(data);
          message.success(t('views.transfer.restoreSuccess'));
        } catch (error) {
          console.error('Error restoring settings:', error);
          message.error(t('views.transfer.restoreError'));
        }
      });
      reader.readAsText(file);
    },
    [profiles, t]
  );

  return (
    <div className={styles.transfer}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t('views.transfer.title')}</h1>
      </header>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('views.transfer.settings')}</h2>
        <div className={styles.sectionBody}>
          <div className={styles.sectionItem}>
            <Button onClick={backupSettings}>
              {t('views.transfer.backup')}
            </Button>
            <p className={styles.sectionItemDescription}>
              {t('views.transfer.backupDesc')}
            </p>
          </div>
          <div className={styles.sectionItem}>
            <Upload accept=".bak" onUpload={restoreSettings}>
              {t('views.transfer.restore')}
            </Upload>
            <p className={styles.sectionItemDescription}>
              {t('views.transfer.restoreDesc')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransferView;
