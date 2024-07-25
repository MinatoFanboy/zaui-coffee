import React, { FC, ReactNode, useMemo, useState } from 'react';
import { Box, Button, Icon, Text } from 'zmp-ui';

interface ListRendererProps<T> {
    items: T[];
    limit?: number;
    noDivider?: boolean;
    onClick?: (item: T) => void;
    renderKey?: (item: T) => string;
    renderLeft: (item: T) => ReactNode;
    renderRight: (item: T) => ReactNode;
    title?: string;
}

export const ListRenderer = <T,>({
    items,
    limit,
    noDivider,
    onClick,
    renderKey,
    renderLeft,
    renderRight,
    title,
}: ListRendererProps<T>) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const collapsedItems = useMemo(() => items.slice(0, limit), [items, limit]);

    return (
        <Box className={'bg-background rounded-xl'}>
            {title && <Text.Title className={'p-4 pb-0'}>{title}</Text.Title>}

            <Box>
                {(isCollapsed ? collapsedItems : items).map((item, i, list) => (
                    <div
                        className={'flex last:pb-0 p-4 space-x-4'}
                        key={renderKey ? renderKey(item) : i}
                        onClick={() => onClick?.(item)}
                    >
                        {renderLeft(item)}
                        <Box className={'flex-1 min-w-0 relative'}>
                            {renderRight(item)}
                            {!noDivider && i < list.length - 1 && (
                                <hr className={'absolute border-divider border-t-[0.5px] -bottom-4 left-0 -right-4'} />
                            )}
                        </Box>
                    </div>
                ))}
            </Box>
            {isCollapsed && collapsedItems.length < items.length ? (
                <Box className={'p-2'}>
                    <Button
                        fullWidth
                        onClick={() => setIsCollapsed(false)}
                        suffixIcon={<Icon icon={'zi-chevron-down'} />}
                        type={'neutral'}
                        variant={'tertiary'}
                    >
                        Xem thêm
                    </Button>
                </Box>
            ) : (
                <Box className={'w-full h-4'}></Box>
            )}
        </Box>
    );
};
