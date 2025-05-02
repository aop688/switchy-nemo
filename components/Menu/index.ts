import InternalMenu from './Menu';
import SubMenu from './SubMenu';
import MenuItem from './MenuItem';

type InternalMenuType = typeof InternalMenu;

interface MenuInterface extends InternalMenuType {
  SubMenu: typeof SubMenu;
  MenuItem: typeof MenuItem;
}

const Menu = InternalMenu as MenuInterface;

Menu.SubMenu = SubMenu;
Menu.MenuItem = MenuItem;

export default Menu;
