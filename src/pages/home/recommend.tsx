import React, { FC, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { Box, Text } from 'zmp-ui';
import { Swiper, SwiperSlide } from 'swiper/react';

import { DisplayPrice, FinalPrice, ProductPicker, ProductSlideSkeleton, Section } from '~/components';
import { recommentProductsState } from '~/state';

export const RecommendContent: FC = () => {
    const recommentProducts = useRecoilValue(recommentProductsState);

    return (
        <Section padding={'title-only'} title={'Gợi ý cho bạn'}>
            <Swiper className={'px-4'} slidesPerView={1.25} spaceBetween={16}>
                {recommentProducts.map((product, i) => (
                    <SwiperSlide key={`RecommendFallback-${i}`}>
                        <ProductPicker product={product}>
                            {({ open }) => (
                                <div className={'space-y-3'} onClick={open}>
                                    <Box
                                        className={'aspect-video bg-center bg-cover bg-skeleton relative round-lg'}
                                        style={{ backgroundImage: `url(${product.image})` }}
                                    >
                                        {product.sale && (
                                            <Text
                                                className={'absolute bg-screen h-2 right-2 text-white top-2 uppercase'}
                                                size={'xxxxSmall'}
                                            >
                                                Giảm{' '}
                                                {product.sale.type === 'percent' ? (
                                                    `${product.sale.percent * 100}%`
                                                ) : (
                                                    <DisplayPrice>{product.sale.amount}</DisplayPrice>
                                                )}
                                            </Text>
                                        )}
                                    </Box>
                                    <Box className={'space-y-1'}>
                                        <Text size={'small'}>{product.name}</Text>
                                        <Text className={'line-through text-gray'} size={'xxSmall'}>
                                            <DisplayPrice>{product.price}</DisplayPrice>
                                        </Text>
                                        <Text className={'font-medium text-primary'} size={'large'}>
                                            <FinalPrice>{product}</FinalPrice>
                                        </Text>
                                    </Box>
                                </div>
                            )}
                        </ProductPicker>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Section>
    );
};

export const RecommendFallback: FC = () => {
    const recommentProducts = [...new Array(3)];

    return (
        <Section padding={'title-only'} title={'Gợi ý cho bạn'}>
            <Swiper className={'px-4'} slidesPerView={1.25} spaceBetween={16}>
                {recommentProducts.map((_, i) => (
                    <SwiperSlide key={`RecommendFallback-${i}`}>
                        <ProductSlideSkeleton />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Section>
    );
};

export const Recommend: FC = () => {
    return (
        <Suspense fallback={<RecommendFallback />}>
            <RecommendContent />
        </Suspense>
    );
};
