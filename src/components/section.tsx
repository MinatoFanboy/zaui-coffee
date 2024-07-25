import React, { FC, PropsWithChildren } from 'react';
import { Text } from 'zmp-ui';
import Box, { BoxProps } from 'zmp-ui/box';

export interface SectionProps extends BoxProps {
    title: string;
    padding?: 'all' | 'none' | 'title-only';
}

export const Section: FC<PropsWithChildren<SectionProps>> = ({ children, padding = 'all', title, ...props }) => {
    return (
        <div
            className={`bg-background ${padding === 'all' ? 'p-4 space-y-4' : ''} ${
                padding === 'title-only' ? 'py-4 space-y-4' : ''
            }`}
            {...props}
        >
            <Text.Title className={`${padding === 'title-only' ? 'px-4' : ''}`}>{title}</Text.Title>
            {children}
        </div>
    );
};
