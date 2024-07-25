import React, { FC, MouseEventHandler, ReactNode } from 'react';
import { Box, Icon, Text } from 'zmp-ui';

export interface ListItemProps {
    onClick?: MouseEventHandler<HTMLDivElement>;
    subtitle: ReactNode;
    title: ReactNode;
}

export const ListItem: FC<ListItemProps> = ({ onClick, subtitle, title }) => {
    return (
        <Box className={'space-x-2'} flex onClick={onClick}>
            <Box className={'flex-1 space-y-[2px]'}>
                <Text className={'font-medium text-primary text-sm'} size={'small'}>
                    {title}
                </Text>
                <Text className={'text-gray'} size={'xSmall'}>
                    {subtitle}
                </Text>
            </Box>
            <Icon icon={'zi-chevron-right'} />
        </Box>
    );
};
