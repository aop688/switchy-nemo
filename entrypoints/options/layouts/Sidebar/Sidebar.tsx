import { Menu } from '@/components';
import { Settings, Save, Plus } from '@/assets/icons';
import styles from './sidebar.module.css';

const Sidebar = () => {
  const [showAddProfile, setShowAddProfile] = useState(false);
  return (
    <aside className={styles.sidebar}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <h1 className={styles.logoTitle}>Switchy Nimo</h1>
        </div>
        <nav className={styles.nav}>
          <h2 className={styles.heading}>Settings</h2>
          <Menu className={styles.menu}>
            <Menu.MenuItem label="General" to="general" Icon={Settings} />
            <Menu.MenuItem label="Import/Export" to="transfer" Icon={Save} />
          </Menu>
        </nav>
        <nav className={styles.nav}>
          <h2 className={styles.heading}>Profiles</h2>
          <button
            className={styles.addProfile}
            title="New profile"
            onClick={() => setShowAddProfile(true)}
          >
            <Plus className={styles.addIcon} />
          </button>
        </nav>
        <Dialog
          visible={showAddProfile}
          title={'New Profile'}
          onOK={() => setShowAddProfile(false)}
          onCancel={() => setShowAddProfile(false)}
          okText={'Create'}
          cancelText={'Close'}
        >
          <div className={styles.dialog}>{'Dialog Body Content'}</div>
        </Dialog>
      </div>
    </aside>
  );
};

export default Sidebar;
