import React, { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';

import { Store } from '~/types';
import { ActiveSheet, ListItem } from '~/components';
import { nearbyStoresState, requestLocationTriesState, selectedStoreIndexState, selectedStoreState } from '~/state';
import { displayDistance } from '~/utils';

export const StorePicker: FC = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const nearbyStores = useRecoilValueLoadable(nearbyStoresState);
    const setSelectedStoreIndex = useSetRecoilState(selectedStoreIndexState);
    const selectedStore = useRecoilValue(selectedStoreState);

    if (!selectedStore) {
        return <RequestStorePickerLocation />;
    }

    return (
        <>
            <ListItem onClick={() => setVisible(true)} subtitle={selectedStore.address} title={selectedStore.name} />
            {nearbyStores.state === 'hasValue' &&
                createPortal(
                    <ActiveSheet
                        actions={[
                            nearbyStores.contents.map((store: Store & { distance?: number }, i) => {
                                return {
                                    text: store.distance
                                        ? `${store.name} - ${displayDistance(store.distance)}`
                                        : store.name,
                                    highLight: store.id === selectedStore?.id,
                                    onClick: () => {
                                        setSelectedStoreIndex(i);
                                    },
                                };
                            }),
                            [{ text: 'Đóng', close: true, danger: true }],
                        ]}
                        onClose={() => setVisible(false)}
                        title={'Các cửa hàng ở gần bạn'}
                        visible={visible}
                    ></ActiveSheet>,
                    document.body,
                )}
        </>
    );
};

export const RequestStorePickerLocation: FC = () => {
    const retry = useSetRecoilState(requestLocationTriesState);

    return (
        <ListItem onClick={() => retry((r) => r + 1)} subtitle={'Yêu cầu truy cập vị trí'} title={'Chọn cửa hàng'} />
    );
};
