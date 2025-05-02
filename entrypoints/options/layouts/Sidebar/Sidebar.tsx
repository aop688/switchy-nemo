import { NavLink } from 'react-router';
import type { LinkProps } from 'react-router';
import { Menu } from '@/components';
import { Settings, Save } from '@/assets/icons';
import styles from './sidebar.module.css';

// const Link = ({ children, to, ...props }: LinkProps) => {
//   return (
//     <NavLink
//       className={({ isActive }) =>
//         styles.link + (isActive ? ` ${styles.activated}` : '')
//       }
//       to={to}
//       {...props}
//     >
//       {children}
//     </NavLink>
//   );
// };

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <h1 className={styles.logoTitle}>Switchy Nimo</h1>
        </div>
        <nav className={styles.nav}>
          <h2 className={styles.heading}>Settings</h2>
          {/* <ol className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/general">General</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/transfer">Import/Export</Link>
            </li>
          </ol> */}
          <Menu className={styles.menu}>
            <Menu.MenuItem label="General" to="general" Icon={Settings} />
            <Menu.MenuItem label="Import/Export" to="transfer" Icon={Save} />
          </Menu>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
