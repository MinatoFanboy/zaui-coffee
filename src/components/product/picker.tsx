import React, { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Box, Button, Text } from 'zmp-ui';
import { useSetRecoilState } from 'recoil';

import { Product, SelectedOptions } from '~/types';
import { FinalPrice } from '../display';
import { Sheet } from '../fullscreen-sheet';
import { MultipleOptionPicker } from './multiple-option-picker';
import { QuantityPicker } from './quantity-picker';
import { SingleOptionPicker } from './single-option-picker';
import { cartState } from '~/state';
import { isIdentical } from '~/utils';

export interface ProductPickerProps {
    children: (methods: { open: () => void; close: () => void }) => ReactNode;
    product?: Product;
    selected?: {
        options: SelectedOptions;
        quantity: number;
    };
}

function getDefaultOptions(product?: Product) {
    if (product && product.variants) {
        return product.variants.reduce(
            (options, variant) => Object.assign(options, { [variant.key]: variant.default }),
            {},
        );
    }
    return {};
}

export const ProductPicker: FC<ProductPickerProps> = ({ children, product, selected }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [options, setOptions] = useState<SelectedOptions>(selected ? selected.options : getDefaultOptions(product));
    const [quantity, setQuantity] = useState<number>(1);
    const setCart = useSetRecoilState(cartState);

    const addToCart = () => {
        if (product) {
            setCart((cart) => {
                let res = [...cart];
                if (selected) {
                    const editing = cart.find(
                        (item) => item.product.id === product.id && isIdentical(item.options, selected.options),
                    )!;

                    if (quantity === 0) {
                        res.splice(cart.indexOf(editing), 1);
                    } else {
                        const existed = cart.find(
                            (item, i) =>
                                i !== cart.indexOf(editing) &&
                                item.product.id === product.id &&
                                isIdentical(item.options, options),
                        );
                        res.splice(cart.indexOf(editing), 1, {
                            ...editing,
                            options,
                            quantity: existed ? existed.quantity + quantity : quantity,
                        });
                        if (existed) {
                            res.splice(cart.indexOf(existed), 1);
                        }
                    }
                } else {
                    const existed = cart.find(
                        (item) => item.product.id === product.id && isIdentical(item.options, options),
                    );
                    if (existed) {
                        res.splice(cart.indexOf(existed), 1, { ...existed, quantity: existed.quantity + quantity });
                    } else {
                        res = res.concat({ product, options, quantity });
                    }
                }

                return res;
            });
        }

        setVisible(false);
    };

    useEffect(() => {
        if (selected) {
            setOptions(selected.options);
            setQuantity(selected.quantity);
        }
    }, [selected]);

    return (
        <>
            {children({ close: () => setVisible(false), open: () => setVisible(true) })}
            {createPortal(
                <Sheet autoHeight onClose={() => setVisible(false)} visible={visible}>
                    {product && (
                        <Box className={'mt-2 space-y-6'} p={4}>
                            <Box className={'space-y-2'}>
                                <Text.Title>{product.name}</Text.Title>
                                <Text>
                                    <FinalPrice options={options}>{product}</FinalPrice>
                                </Text>
                                <Text>
                                    <div dangerouslySetInnerHTML={{ __html: product.descriptions ?? '' }}></div>
                                </Text>
                            </Box>
                            <Box className={'space-y-5'}>
                                {product.variants &&
                                    product.variants.map((variant) =>
                                        variant.type === 'single' ? (
                                            <SingleOptionPicker
                                                key={variant.key}
                                                onChange={(selectedOption) =>
                                                    setOptions((prevOptions) => ({
                                                        ...prevOptions,
                                                        [variant.key]: selectedOption,
                                                    }))
                                                }
                                                value={options[variant.key] as string}
                                                variant={variant}
                                            />
                                        ) : (
                                            <MultipleOptionPicker
                                                key={variant.key}
                                                onChange={(selectedOption) =>
                                                    setOptions((prevOptions) => ({
                                                        ...prevOptions,
                                                        [variant.key]: selectedOption,
                                                    }))
                                                }
                                                product={product}
                                                value={options[variant.key] as string[]}
                                                variant={variant}
                                            />
                                        ),
                                    )}
                                <QuantityPicker onChange={setQuantity} value={quantity} />
                                {selected ? (
                                    <Button
                                        fullWidth
                                        onClick={addToCart}
                                        type={quantity > 0 ? 'highlight' : 'neutral'}
                                        variant={quantity > 0 ? 'primary' : 'secondary'}
                                    >
                                        {quantity > 0 ? (selected ? 'Cập nhật giỏ hàng' : 'Thêm vào giỏ hàng') : 'Xóa'}
                                    </Button>
                                ) : (
                                    <Button
                                        disabled={!quantity}
                                        fullWidth
                                        onClick={addToCart}
                                        type={'highlight'}
                                        variant={'primary'}
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    )}
                </Sheet>,
                document.body,
            )}
        </>
    );
};
