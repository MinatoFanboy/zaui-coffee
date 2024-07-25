import React, { FC, useMemo } from 'react';

import { DisplayPrice } from './price';
import { Product, SelectedOptions } from '~/types';
import { calcFinalPrice } from '~/utils';

export const FinalPrice: FC<{ children: Product; options?: SelectedOptions }> = ({ children, options }) => {
    const finalPrice = useMemo(() => calcFinalPrice(children, options), [children, options]);

    return <DisplayPrice>{finalPrice}</DisplayPrice>;
};
