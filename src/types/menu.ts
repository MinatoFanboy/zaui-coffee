import { ReactNode } from 'react';

export interface MenuItem {
    activeIcon?: ReactNode;
    icon: ReactNode;
    label: string;
}
