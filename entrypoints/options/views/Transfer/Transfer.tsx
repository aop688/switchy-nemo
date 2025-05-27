import { message, Button, Upload } from '@/components';
import { useStore } from '@options/stores';
import { downloadFile } from '@/utils/misc';
import styles from './transfer.module.css';

const TransferView = () => {
  const { profiles } = useStore();

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
          message.success('Settings restored successfully!');
        } catch (error) {
          console.error('Error restoring settings:', error);
          message.error(
            'Failed to restore settings. Please check the file format.'
          );
        }
      });
      reader.readAsText(file);
    },
    [profiles]
  );

  return (
    <div className={styles.transfer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Import/Export</h1>
      </header>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Settings</h2>
        <div className={styles.sectionBody}>
          <div className={styles.sectionItem}>
            <Button onClick={backupSettings}>Backup Settings</Button>
            <p className={styles.sectionItemDescription}>
              Make a full backup of your options (including profiles and all
              other options).
            </p>
          </div>
          <div className={styles.sectionItem}>
            <Upload accept=".bak" onUplod={restoreSettings}>
              Restore Settings
            </Upload>
            <p className={styles.sectionItemDescription}>
              Restore your Switchy Nemo options from a local file.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransferView;
