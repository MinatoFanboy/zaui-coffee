import React, { FC } from 'react';
import { Box, Radio, Text } from 'zmp-ui';

import { Variant } from '~/types';

export const SingleOptionPicker: FC<{ onChange: (value: string) => void; value: string; variant: Variant }> = ({
    onChange,
    value,
    variant,
}) => {
    return (
        <Box className={'space-y-2'} my={8}>
            <Text.Title size={'small'}>{variant.label}</Text.Title>
            <Radio.Group
                className={'flex-1 justify-between grid grid-cols-3'}
                name={variant.key}
                onChange={(selectedOption: string) => onChange(selectedOption)}
                options={variant.options.map((option) => ({ label: option.label, value: option.key }))}
                value={value}
            />
        </Box>
    );
};
