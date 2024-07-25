import React, { FC } from 'react';
import { Box, Header, Text } from 'zmp-ui';
import { useRecoilValueLoadable } from 'recoil';

import appConfig from '../../../app-config.json';
import logo from '~/static/logo.png';
import { getConfig } from '~/utils';
import { userState } from '~/state';

export const Welcome: FC = () => {
    const user = useRecoilValueLoadable(userState);

    return (
        <Header
            className={'app-header no-border pl-4 flex-none pb-[6px]'}
            showBackIcon={false}
            title={
                (
                    <Box alignItems={'center'} className={'space-x-2'} flex>
                        <img
                            className={'border-inset h-8 rounded-lg w-8'}
                            src={getConfig((c) => c.template.headerLogo) || logo}
                        />

                        <Box>
                            <Text.Title size={'small'}>{appConfig.app.title}</Text.Title>
                            {user.state === 'hasValue' ? (
                                <Text className={'text-gray'} size={'xxSmall'}>
                                    Welcome, {user.contents.name}!
                                </Text>
                            ) : (
                                <Text>...</Text>
                            )}
                        </Box>
                    </Box>
                ) as unknown as string
            }
        />
    );
};
