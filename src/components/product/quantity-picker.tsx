import React, { FC } from 'react';
import { Box, Button, Icon, Text } from 'zmp-ui';

export const QuantityPicker: FC<{ onChange: (quantity: number) => void; value: number }> = ({ onChange, value }) => {
    return (
        <Box className={'border border-[#E9EBED] rounded-full p-[6px]'} flex>
            <Button
                disabled
                icon={
                    <div className={'py-3 px-1'}>
                        <div className={'w-full h-[2px] bg-black'} />
                    </div>
                }
                onClick={() => onChange(value - 1)}
                type={'neutral'}
                variant={'secondary'}
            />
            <Box alignItems={'center'} className={'flex-1'} flex justifyContent={'center'}>
                <Text className={'font-medium'} size={'large'}>
                    Số lượng: {value}
                </Text>
            </Box>
            <Button
                icon={<Icon icon={'zi-plus'} />}
                onClick={() => onChange(value + 1)}
                type={'neutral'}
                variant={'secondary'}
            />
        </Box>
    );
};
