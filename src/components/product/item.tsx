import React, { FC } from 'react';
import { Box, Text } from 'zmp-ui';

import { Product } from '~/types';
import { FinalPrice } from '../display';
import { ProductPicker } from './picker';

export const ProductItem: FC<{ product: Product }> = ({ product }) => {
    return (
        <ProductPicker product={product}>
            {({ open }) => (
                <div className={'space-y-2'} onClick={open}>
                    <Box className={'w-full aspect-square relative'}>
                        <img
                            className={
                                'absolute bg-skeletion bottom-0 h-full left-0 object-cover object-center right-0 rounded-lg top-0 w-full'
                            }
                            loading={'lazy'}
                            src={product.image}
                        />
                    </Box>
                    <Text>{product.name}</Text>
                    <Text className={'pb-2 text-gray'} size={'xxSmall'}>
                        <FinalPrice>{product}</FinalPrice>
                    </Text>
                </div>
            )}
        </ProductPicker>
    );
};
