import React from 'react';
import { App, ZMPRouter, SnackbarProvider } from 'zmp-ui';
import { RecoilRoot } from 'recoil';

import { Layout } from './layout';
import { ConfigProvider } from './config-provider';
import { getConfig } from '~/utils';

const MyApp = () => {
    return (
        <RecoilRoot>
            <ConfigProvider
                cssVariables={{
                    '--zmp-primary-color': getConfig((c) => c.template.primaryColor),
                    '--zmp-background-color': '#F4F5F6',
                }}
            >
                <App>
                    <SnackbarProvider>
                        <ZMPRouter>
                            <Layout />
                        </ZMPRouter>
                    </SnackbarProvider>
                </App>
            </ConfigProvider>
        </RecoilRoot>
    );
};
export default MyApp;
