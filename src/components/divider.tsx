import React, { FC } from 'react';
import { Box } from 'zmp-ui';
import { BoxProps } from 'zmp-ui/box';

export const Divider: FC<{ className?: string; size?: number } & BoxProps> = ({ className, size = 8, ...props }) => {
    return <Box style={{ backgroundColor: 'var(--zmp-background-color)', minHeight: size }} {...props} />;
};
