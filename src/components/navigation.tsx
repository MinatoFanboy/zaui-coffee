import React, { FC, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigation, Icon } from 'zmp-ui';

import { MenuItem } from '~/types';
import { CartIcon } from './cart-icon';
import { useVirtualKeyboardVisible } from '~/hooks';

const tabs: Record<string, MenuItem> = {
    '/': {
        icon: <Icon icon={'zi-home'} />,
        label: 'Trang chủ',
    },
    '/notification': {
        icon: <Icon icon={'zi-notif'} />,
        label: 'Thông báo',
    },
    '/cart': {
        activeIcon: <CartIcon active />,
        icon: <CartIcon />,
        label: 'Giỏ hàng',
    },
    '/profile': {
        activeIcon: <Icon icon={'zi-user-solid'} />,
        icon: <Icon icon={'zi-user'} />,
        label: 'Cá nhân',
    },
};

export type TabKeys = keyof typeof tabs;

export const NO_BOTTOM_NAVIGATION_PAGES = ['/search', '/category'];

export const Navigation: FC = () => {
    const [activeTab, setActiveTab] = useState<TabKeys>('/');
    const keyboardVisible = useVirtualKeyboardVisible();
    const navigate = useNavigate();
    const location = useLocation();

    const noBottomNav = useMemo(() => {
        return NO_BOTTOM_NAVIGATION_PAGES.includes(location.pathname);
    }, [location]);

    if (noBottomNav || keyboardVisible) {
        return <></>;
    }

    return (
        <BottomNavigation
            activeKey={activeTab}
            className={'z-50'}
            id={'footer'}
            onChange={(key: TabKeys) => setActiveTab(key)}
        >
            {Object.keys(tabs).map((path: TabKeys) => (
                <BottomNavigation.Item
                    activeIcon={tabs[path].activeIcon}
                    icon={tabs[path].icon}
                    key={path}
                    label={tabs[path].label}
                    onClick={() => navigate(path)}
                />
            ))}
        </BottomNavigation>
    );
};
