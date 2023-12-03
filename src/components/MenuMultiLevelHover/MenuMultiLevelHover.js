import clsx from 'clsx';
import styles from './MenuMultiLevelHover.module.scss';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';

const MultiMenu = ({ menus, location }) => {
    const [show, setShow] = useState(true);

    const MenuItem = ({ dept, data, menuName, hasSubmenu, show }) => {
        const handleClickMenuItem = () => {
            setShow(false);
        };
        return (
            <li
                key={menuName}
                className={clsx(styles['menu-item'], {
                    [styles['active']]: data?.to && data?.to === location,
                })}
                onClick={handleClickMenuItem}
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
            <div>
                {show && (
                    <ul className={clsx(styles['submenu'])}>
                        {data.map((submenuItem, index) => {
                            menuName = `${menuName}-${index}`;
                            return (
                                <MenuItem
                                    dept={dept}
                                    data={submenuItem}
                                    menuName={menuName}
                                    hasSubmenu={submenuItem.submenu}
                                />
                            );
                        })}
                    </ul>
                )}
            </div>
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
                            show={show}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

MultiMenu.propTypes = {
    menus: PropTypes.object.isRequired,
    location: PropTypes.string,
};

export default MultiMenu;
