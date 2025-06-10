import styles from './app.module.css';

function App() {
  return (
    <div className={styles.options}>
      <button className={styles.optionsItem}>Direct</button>
      <button className={styles.optionsItem}>System Proxy</button>
      <hr className={styles.divider} />
      <a href="./options.html" target="_blank" className={styles.optionsItem}>
        Options
      </a>
    </div>
  );
}

export default App;
