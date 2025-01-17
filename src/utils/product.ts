import { createOrder } from 'zmp-sdk';
import { Option, Product, SelectedOptions } from '~/types';
import { getConfig } from './config';

export function getDummyImage(filename: string) {
    return `https://zalo-miniapp.github.io/zaui-coffee/dummy/${filename}`;
}

export function isIdentical(option1: SelectedOptions, option2: SelectedOptions) {
    const option1Keys = Object.keys(option1);
    const option2Keys = Object.keys(option2);

    if (option1Keys.length !== option2Keys.length) {
        return false;
    }

    for (const key of option1Keys) {
        const option1Value = option1Keys[key];
        const option2Value = option2Keys[key];

        const areEqual =
            Array.isArray(option1Value) &&
            Array.isArray(option2Value) &&
            [...option1Value].sort().toString() === [...option2Value].sort().toString();

        if (option1Value !== option2Value && !areEqual) {
            return false;
        }
    }

    return true;
}

export function calcFinalPrice(product: Product, options?: SelectedOptions) {
    let finalPrice = product.price;
    if (product.sale) {
        if (product.sale.type === 'fixed') {
            finalPrice = product.price - product.sale.amount;
        } else {
            finalPrice = product.price * (1 - product.sale.percent);
        }
    }

    if (options && product.variants) {
        const selectedOptions: Option[] = [];
        for (const variantKey in options) {
            const variant = product.variants.find((v) => v.key === variantKey);
            if (variant) {
                const currentOption = options[variantKey];
                if (typeof currentOption === 'string') {
                    const selected = variant.options.find((o) => o.key === currentOption);
                    if (selected) {
                        selectedOptions.push(selected);
                    }
                } else {
                    const selecteds = variant.options.filter((o) => currentOption.includes(o.key));
                    selectedOptions.push(...selecteds);
                }
            }
        }
        finalPrice = selectedOptions.reduce((price, option) => {
            if (option.priceChange) {
                if (option.priceChange.type === 'fixed') {
                    return price + option.priceChange.amount;
                } else {
                    return price + product.price * option.priceChange.percent;
                }
            }

            return price;
        }, finalPrice);
    }

    return finalPrice;
}

export const pay = (amount: number, description?: string) =>
    createOrder({
        amount,
        desc: description ?? `Thanh toán cho ${getConfig((config) => config.app.title)}`,
        fail: (err) => console.log('Payment error:', err),
        item: [],
        success: (data) => console.log('Payment success:', data),
    });
