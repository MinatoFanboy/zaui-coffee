import React, { FC } from 'react';
import { Box, Checkbox, Text } from 'zmp-ui';

import { MultipleOptionVariant, Product } from '~/types';
import { DisplayPriceChange } from '../display';

export const MultipleOptionPicker: FC<{
    onChange: (value: string[]) => void;
    product: Product;
    value: string[];
    variant: MultipleOptionVariant;
}> = ({ onChange, product, value, variant }) => {
    return (
        <Box className={'space-y-2'} my={8}>
            <Text.Title>{variant.label}</Text.Title>
            <Checkbox.Group
                className={'flex flex-col space-y-2'}
                defaultValue={value}
                name={variant.key}
                onChange={(selectedOptions: string[]) => onChange(selectedOptions)}
                options={variant.options.map((option) => ({
                    className: 'last-of-type:mr-2',
                    label: (
                        <div className={'w-full'}>
                            <span className={'flex-1'}>{option.label}</span>
                            <span className={'absolute right-0'}>
                                <DisplayPriceChange option={option}>{product}</DisplayPriceChange>
                            </span>
                        </div>
                    ) as any,
                    value: option.key,
                }))}
                value={value}
            />
        </Box>
    );
};
