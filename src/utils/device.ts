import { configAppView } from 'zmp-sdk';

export function matchStatusBarColor(visible: boolean) {
    if (visible) {
        configAppView({ headerTextColor: 'white', statusBarType: 'transparent' });
    } else {
        configAppView({ headerTextColor: 'black', statusBarType: 'transparent' });
    }
}
