import React from 'react';
import { Header, Page } from 'zmp-ui';

import { CartItems } from './cart-items';
import { Delivery } from './delivery';
import { CartPreview } from './preview';
import { TermsAndPolicies } from './term-and-policies';
import { Divider } from '~/components';
import { useVirtualKeyboardVisible } from '~/hooks';

const CartPage: React.FunctionComponent = () => {
    const keyboardVisible = useVirtualKeyboardVisible();

    return (
        <Page>
            <Header showBackIcon={false} title={'Giỏ hàng'} />
            <CartItems />
            <Delivery />
            <Divider size={12} />
            <TermsAndPolicies />
            <Divider className={'flex-1'} size={32} />
            {!keyboardVisible && <CartPreview />}
        </Page>
    );
};

export default CartPage;
