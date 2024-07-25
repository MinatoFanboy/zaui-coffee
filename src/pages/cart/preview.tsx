import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { Box, Button, Text } from 'zmp-ui';

import { DisplayPrice } from '~/components';
import { totalPriceState, totalQuantityState } from '~/state';
import { pay } from '~/utils';

export const CartPreview: FC = () => {
    const quantity = useRecoilValue(totalQuantityState);
    const totalPrice = useRecoilValue(totalPriceState);

    return (
        <Box className={'bg-background bottom-0 p-4 space-x-4 sticky'} flex>
            <Box className={'min-w-[120px] flex-none'} flex flexDirection={'column'} justifyContent={'space-between'}>
                <Text className={'text-gray'} size={'xSmall'}>
                    {quantity} sản phẩm
                </Text>
                <Text.Title size={'large'}>
                    <DisplayPrice>{totalPrice}</DisplayPrice>
                </Text.Title>
            </Box>
            <Button disabled={!quantity} fullWidth onClick={() => pay(totalPrice)} type={'highlight'}>
                Đặt hàng
            </Button>
        </Box>
    );
};
