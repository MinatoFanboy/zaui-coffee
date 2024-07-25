import React, { FC } from 'react';
import { Sheet as OriginalSheet } from 'zmp-ui';
import { ActionSheetProps, SheetProps } from 'zmp-ui/sheet';

import { useMatchStatusTextColor } from '~/hooks';

export const Sheet: FC<Omit<SheetProps, 'ref'>> = (props) => {
    useMatchStatusTextColor(props.visible);
    return <OriginalSheet {...props} />;
};

export const ActiveSheet: FC<Omit<ActionSheetProps, 'ref'>> = (props) => {
    useMatchStatusTextColor(props.visible);
    return <OriginalSheet.Actions {...props} />;
};
