import React, { FC, Suspense } from 'react';
import { Box, Text } from 'zmp-ui';
import { useRecoilValue } from 'recoil';

import { FinalPrice, ProductPicker, ProductSearchResultSkeleton } from '~/components';
import { resultState } from '~/state';

const SearchResultContent: FC = () => {
    const result = useRecoilValue(resultState);

    return (
        <Box className={'bg-background flex-1 min-h-0'} flex flexDirection={'column'}>
            <Text.Title className={'p-4 pt-0'} size={'small'}>
                Kết quả {result.length}
            </Text.Title>
            {result.length > 0 ? (
                <Box className={'flex-1 overflow-y-auto p-4 pt-0 space-y-4'}>
                    {result.map((product) => (
                        <ProductPicker key={product.id} product={product}>
                            {({ open }) => (
                                <div className={'flex items-center space-x-4'} onClick={open}>
                                    <img className={'h-[88px] rounded-lg w-[88px]'} src={product.image} />
                                    <Box className={'space-y-2'}>
                                        <Text>{product.name}</Text>
                                        <Text className={'text-gray'} size={'xSmall'}>
                                            <FinalPrice>{product}</FinalPrice>
                                        </Text>
                                    </Box>
                                </div>
                            )}
                        </ProductPicker>
                    ))}
                </Box>
            ) : (
                <Box className={'items-center flex flex-1 justify-center pb-24'}>
                    <Text className={'text-gray'} size={'xSmall'}>
                        Không tìm thấy kết quả. Vui lòng thử lại
                    </Text>
                </Box>
            )}
        </Box>
    );
};

const SearchResultFallback: FC = () => {
    const result = [...new Array(5)];

    return (
        <Box className={'bg-background flex-1 min-h-0'} flex flexDirection={'column'}>
            <Text.Title className={'p-4 pt-0'} size={'small'}>
                Đang tìm kiếm...
            </Text.Title>
            <Box className={'flex-1 overflow-y-auto p-4 pt-0 space-y-4'}>
                {result.map((_, i) => (
                    <ProductSearchResultSkeleton key={i} />
                ))}
            </Box>
        </Box>
    );
};

export const SearchResult: FC = () => {
    return (
        <Suspense fallback={<SearchResultFallback />}>
            <SearchResultContent />
        </Suspense>
    );
};
