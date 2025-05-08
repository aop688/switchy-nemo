import styles from './about.module.css';

const AboutView = () => {
  return (
    <div className={styles.about}>
      <header className={styles.header}>
        <h1 className={styles.title}>About</h1>
      </header>
    </div>
  );
};

export default AboutView;
