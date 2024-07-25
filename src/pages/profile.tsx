import React, { FC } from 'react';
import { Box, Icon, Header, Page, Text } from 'zmp-ui';

import { useToBeImplemented } from '~/hooks';
import { ListRenderer } from '~/components';
import subcriptionDecor from '~/static/subscription-decor.svg';

const Subscription: FC = () => {
    const onClick = useToBeImplemented();

    return (
        <Box className={'m-4'} onClick={onClick}>
            <Box
                className={'bg-green p-4 rounded-xl space-y-2 text-white'}
                style={{
                    backgroundImage: `url(${subcriptionDecor})`,
                    backgroundPosition: 'right 8px center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <Text.Title>Đăng ký thành viên</Text.Title>
                <Text>Tích điểm đổi thưởng, mở rộng tiện ích</Text>
            </Box>
        </Box>
    );
};

const Personal: FC = () => {
    const onClick = useToBeImplemented();

    return (
        <Box className={'m-4'}>
            <ListRenderer
                items={[
                    {
                        left: <Icon icon={'zi-user'} />,
                        right: (
                            <Box flex>
                                <Text.Header className={'flex-1 font-normal items-center'}>
                                    Thông tin tài khoản
                                </Text.Header>
                                <Icon icon={'zi-chevron-right'} />
                            </Box>
                        ),
                    },
                    {
                        left: <Icon icon={'zi-clock-2'} />,
                        right: (
                            <Box flex>
                                <Text.Header className={'flex-1 font-normal items-center'}>
                                    Lịch sử đơn hàng
                                </Text.Header>
                                <Icon icon={'zi-chevron-right'} />
                            </Box>
                        ),
                    },
                ]}
                onClick={onClick}
                renderLeft={(item) => item.left}
                renderRight={(item) => item.right}
                title={'Cá nhân'}
            />
        </Box>
    );
};

const Other: FC = () => {
    const onClick = useToBeImplemented();

    return (
        <Box className={'m-4'}>
            <ListRenderer
                items={[
                    {
                        left: <Icon icon={'zi-star'} />,
                        right: (
                            <Box flex>
                                <Text.Header className={'flex-1 font-normal items-center'}>
                                    Đánh giá đơn hàng
                                </Text.Header>
                                <Icon icon={'zi-chevron-right'} />
                            </Box>
                        ),
                    },
                    {
                        left: <Icon icon={'zi-call'} />,
                        right: (
                            <Box flex>
                                <Text.Header className={'flex-1 font-normal items-center'}>
                                    Liên hệ và góp ý
                                </Text.Header>
                                <Icon icon={'zi-chevron-right'} />
                            </Box>
                        ),
                    },
                ]}
                onClick={onClick}
                renderLeft={(item) => item.left}
                renderRight={(item) => item.right}
                title={'Khác'}
            />
        </Box>
    );
};

const ProfilePage: React.FunctionComponent = () => {
    return (
        <Page>
            <Header showBackIcon={false} title={' '} />
            <Subscription />
            <Personal />
            <Other />
        </Page>
    );
};

export default ProfilePage;
