import { NavLink } from 'react-router';
import type { LinkProps } from 'react-router';
import styles from './sidebar.module.css';

const Link = ({ children, to, ...props }: LinkProps) => {
  return (
    <NavLink
      className={({ isActive }) =>
        styles.link + (isActive ? ` ${styles.activated}` : '')
      }
      to={to}
      {...props}
    >
      {children}
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <h1 className={styles.logoTitle}>Switchy Nimo</h1>
        </div>
        <nav className={styles.nav}>
          <h2 className={styles.heading}>Settings</h2>
          <ol className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/general">General</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/transfer">Import/Export</Link>
            </li>
          </ol>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
