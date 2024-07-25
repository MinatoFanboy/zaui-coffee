import React, { FC, Suspense } from 'react';
import { Box } from 'zmp-ui';
import { useRecoilValue } from 'recoil';

import { ProductItem, ProductItemSkeleton, Section } from '~/components';
import { productsState } from '~/state';

export const ProductListContent: FC = () => {
    const products = useRecoilValue(productsState);

    return (
        <Section title={'Danh sách sản phẩm'}>
            <Box className={'grid grid-cols-2 gap-4'}>
                {products.map((product, i) => (
                    <ProductItem key={`ProductListContent-${i}`} product={product} />
                ))}
            </Box>
        </Section>
    );
};

export const ProductListFallback: FC = () => {
    const products = [...new Array(12)];

    return (
        <Section title={'Danh sách sản phẩm'}>
            <Box className={'grid grid-cols-2 gap-4'}>
                {products.map((_, i) => (
                    <ProductItemSkeleton key={`ProductListFallback-${i}`} />
                ))}
            </Box>
        </Section>
    );
};

export const ProductList: FC = () => {
    return (
        <Suspense fallback={<ProductListFallback />}>
            <ProductListContent />
        </Suspense>
    );
};
