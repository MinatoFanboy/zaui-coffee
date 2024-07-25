import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { Page, Header, Box, Text } from 'zmp-ui';

import { Divider, ListRenderer } from '~/components';
import { notificationsState } from '~/state';

const NotificationList: FC = () => {
    const notifications = useRecoilValue(notificationsState);

    return (
        <Box className={'bg-background'}>
            <ListRenderer
                items={notifications}
                renderLeft={(item) => <img className={'h-10 rounded-full w-10'} src={item.image} />}
                renderRight={(item) => (
                    <Box key={item.id}>
                        <Text.Header>{item.title}</Text.Header>
                        <Text className={'overflow-hidden text-ellipsis text-gray whitespace-nowrap'} size={'small'}>
                            {item.content}
                        </Text>
                    </Box>
                )}
                noDivider
            />
        </Box>
    );
};

const NotificationPage: React.FunctionComponent = () => {
    return (
        <Page>
            <Header showBackIcon={false} title={'Thông báo'} />
            <Divider />
            <NotificationList />
        </Page>
    );
};

export default NotificationPage;
