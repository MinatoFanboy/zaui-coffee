import React, { FC, useState } from 'react';
import { Box, Text } from 'zmp-ui';
import { useRecoilValue } from 'recoil';

import { cartState } from '~/state';
import { CartItem } from '~/types';
import { DisplaySelectedOptions, FinalPrice, ListRenderer, ProductPicker } from '~/components';

export const CartItems: FC = () => {
    const cart = useRecoilValue(cartState);
    const [editingItem, setEditingItem] = useState<CartItem | undefined>();

    return (
        <Box className={'px-4 py-3'}>
            {cart.length > 0 ? (
                <ProductPicker product={editingItem?.product} selected={editingItem}>
                    {({ open }) => (
                        <ListRenderer
                            items={cart}
                            limit={3}
                            onClick={(item) => {
                                setEditingItem(item);
                                open();
                            }}
                            renderKey={({ options, product, quantity }) =>
                                JSON.stringify({ options, product: product.id, quantity })
                            }
                            renderLeft={(item) => <img className={'h-10 rounded-lg w-10'} src={item.product.image} />}
                            renderRight={(item) => (
                                <Box className={'space-x-1'} flex>
                                    <Box className={'flex-1 space-y-1'}>
                                        <Text size={'small'}>{item.product.name}</Text>
                                        <Text className={'text-gray'} size={'xSmall'}>
                                            <FinalPrice options={item.options}>{item.product}</FinalPrice>
                                        </Text>
                                        <Text className={'text-gray'} size={'xxxSmall'}>
                                            <DisplaySelectedOptions options={item.options}>
                                                {item.product}
                                            </DisplaySelectedOptions>
                                        </Text>
                                    </Box>
                                    <Text className={'font-medium text-primary'} size={'small'}>
                                        x{item.quantity}
                                    </Text>
                                </Box>
                            )}
                        />
                    )}
                </ProductPicker>
            ) : (
                <Text className={'bg-background px-4 py-8 rounded-xl text-center text-gray'} size={'xxSmall'}>
                    Không có sản phẩm trong giỏ hàng
                </Text>
            )}
        </Box>
    );
};
