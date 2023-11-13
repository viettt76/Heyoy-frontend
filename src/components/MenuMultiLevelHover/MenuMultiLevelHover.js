import clsx from 'clsx';
import styles from './MenuMultiLevelHover.module.scss';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

const MultiMenu = ({ menus, location }) => {
    const MenuItem = ({ dept, data, menuName, hasSubmenu }) => {
        return (
            <li
                key={menuName}
                className={clsx(styles['menu-item'], {
                    [styles['active']]: data?.to && data?.to === location,
                })}
            >
                <Link to={data.to} className={clsx(styles['menu-name'])}>
                    <FormattedMessage id={data.name} />
                </Link>

                {hasSubmenu?.length > 0 && <Submenu dept={dept} data={hasSubmenu} />}
            </li>
        );
    };

    const Submenu = ({ dept, data, menuName }) => {
        dept += 1;
        return (
            <ul className={clsx(styles['submenu'])}>
                {data.map((submenuItem, index) => {
                    menuName = `${menuName}-${index}`;
                    return (
                        <MenuItem dept={dept} data={submenuItem} menuName={menuName} hasSubmenu={submenuItem.submenu} />
                    );
                })}
            </ul>
        );
    };

    return (
        <div className={clsx(styles['menu-wrapper'])}>
            <span className={clsx(styles['menu-label'])}>
                <FormattedMessage id={menus.name} />
            </span>
            <ul className={clsx(styles['menu'])}>
                {menus.menu.map((menuItem, index) => {
                    const dept = 1;
                    const menuName = `menu-${index}`;
                    return (
                        <MenuItem
                            key={menuName}
                            dept={dept}
                            data={menuItem}
                            menuName={menuName}
                            hasSubmenu={menuItem.submenu}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default MultiMenu;
