import { useTranslation } from 'react-i18next';
import profileIcon from '@/assets/nemo.svg';
import { version } from '@/package.json';
import styles from './about.module.css';

const AboutView = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.about}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t('views.about.title')}</h1>
      </header>
      <section className={styles.section}>
        <div className={styles.logo}>
          <img
            src={profileIcon}
            alt="Switchy Nemo"
            className={styles.logoImage}
          />
          <div className={styles.logoText}>
            <h2 className={styles.logoTitle}>Switchy Nemo</h2>
            <p>{t('views.about.description')}</p>
          </div>
        </div>
        <div className={styles.info}>
          <p className={styles.infoText}>
            {t('views.about.version', { version })}
          </p>
          <p className={styles.infoText}>
            © {new Date().getFullYear()} Switchy Nemo Authors. All rights
            reserved.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutView;
