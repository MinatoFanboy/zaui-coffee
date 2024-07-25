import React, { FC, Suspense } from 'react';
import { Box, Icon, Text } from 'zmp-ui';

import { ElasticTextarea, ListRenderer } from '~/components';
import { PersonPicker, RequestPersonPickerPhone } from './person-picker';
import { StorePicker } from './store-picker';
import { TimePicker } from './time-picker';

export const Delivery: FC = () => {
    return (
        <Box className={'px-4 space-y-3'}>
            <Text.Header>Hình thức nhận hàng</Text.Header>
            <ListRenderer
                items={[
                    {
                        left: <Icon className={'my-auto'} icon={'zi-location'} />,
                        right: (
                            <Suspense fallback={<RequestPersonPickerPhone />}>
                                <StorePicker />
                            </Suspense>
                        ),
                    },
                    {
                        left: <Icon className={'zi-clock-1'} icon={'zi-location'} />,
                        right: (
                            <Box className={'space-x-2'} flex>
                                <Box className={'flex-1 space-y-[2px]'}>
                                    <TimePicker />
                                    <Text className={'text-gray'} size={'xSmall'}>
                                        Thời gian nhận hàng
                                    </Text>
                                </Box>
                                <Icon icon="zi-chevron-right" />
                            </Box>
                        ),
                    },
                    {
                        left: <Icon icon="zi-user" className="my-auto" />,
                        right: (
                            <Suspense fallback={<RequestPersonPickerPhone />}>
                                <PersonPicker />
                            </Suspense>
                        ),
                    },
                    {
                        left: <Icon icon="zi-note" className="my-auto" />,
                        right: (
                            <Box flex>
                                <ElasticTextarea
                                    placeholder="Nhập ghi chú..."
                                    className="border-none px-0 w-full focus:outline-none"
                                    maxRows={4}
                                />
                            </Box>
                        ),
                    },
                ]}
                limit={4}
                renderLeft={(item) => item.left}
                renderRight={(item) => item.right}
            />
        </Box>
    );
};
