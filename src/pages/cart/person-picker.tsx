import React, { FC } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ListItem } from '~/components';
import { phoneState, requestPhoneTriesState, userState } from '~/state';

export const PersonPicker: FC = () => {
    const user = useRecoilValue(userState);
    const phone = useRecoilValue(phoneState);

    if (!phone) {
        return <RequestPersonPickerPhone />;
    }

    return <ListItem subtitle={'Người nhận'} title={`${user.name} - ${phone}`} />;
};

export const RequestPersonPickerPhone: FC = () => {
    const retry = useSetRecoilState(requestPhoneTriesState);

    return (
        <ListItem
            onClick={() => retry((r) => r + 1)}
            subtitle={'Yêu cầu truy cập số điện thoại'}
            title={'Chọn người nhận'}
        />
    );
};
