import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getSystemInfo } from 'zmp-sdk';
import { Box } from 'zmp-ui';

import { Navigation } from './navigation';
import { ScrollRestoration } from './scroll-restoration';
import { CartPage, CategoryPage, HomePage, NotificationPage, ProfilePage, SearchPage } from '~/pages';

// if (getSystemInfo().platform === 'android') {
//     const androidSafeTop = Math.round(
//         (window as any).ZaloJavaScriptInterface.getStatusBarHeight() / window.devicePixelRatio,
//     );
//     document.body.style.setProperty('--zaui-safe-area-inset-top', `${androidSafeTop}`);
// }

export const Layout: FC = () => {
    return (
        <Box className={'h-screen'} flex flexDirection={'column'}>
            <ScrollRestoration />
            <Box className={'flex-1 flex flex-col overflow-hidden'}>
                <Routes>
                    <Route element={<HomePage />} path={'/'} />
                    <Route path="/search" element={<SearchPage />}></Route>
                    <Route path="/category" element={<CategoryPage />}></Route>
                    <Route path="/notification" element={<NotificationPage />}></Route>
                    <Route path="/cart" element={<CartPage />}></Route>
                    <Route path="/profile" element={<ProfilePage />}></Route>
                </Routes>
            </Box>
            <Navigation />
        </Box>
    );
};
