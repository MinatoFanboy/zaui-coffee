import { useEffect, useRef, useState } from 'react';
import { useSnackbar } from 'zmp-ui';

import { matchStatusBarColor } from '~/utils';

const originalScreenHeight = window.innerHeight;

export function useVirtualKeyboardVisible() {
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        const detectKeyboardOpen = () => {
            setVisible(window.innerHeight + 160 < originalScreenHeight);
        };
        window.addEventListener('resize', detectKeyboardOpen);

        return () => {
            window.removeEventListener('resize', detectKeyboardOpen);
        };
    }, []);

    return visible;
}

export function useMatchStatusTextColor(visible?: boolean) {
    const changeRef = useRef<boolean>(false);

    useEffect(() => {
        if (changeRef.current) {
            matchStatusBarColor(visible ?? false);
        } else {
            changeRef.current = true;
        }
    }, [visible]);
}

export function useToBeImplemented() {
    const snackbar = useSnackbar();

    return () => {
        snackbar.openSnackbar({ text: 'Chức năng dành cho bên tích hợp phát triển', type: 'success' });
    };
}
