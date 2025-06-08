import styles from './general.module.css';

const GeneralView = () => {
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
        </div>
      </section>
    </div>
  );
};

export default GeneralView;
