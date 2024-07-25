import React, { FC, PropsWithChildren, useEffect } from 'react';

export const ConfigProvider: FC<PropsWithChildren<{ cssVariables: Record<string, string> }>> = ({
    children,
    cssVariables,
}) => {
    useEffect(() => {
        Object.keys(cssVariables)
            .filter((cv) => cssVariables[cv])
            .forEach((cv) => {
                document.documentElement.style.setProperty(`${cv}`, cssVariables[cv]);
            });

        return () => {
            Object.keys(cssVariables).forEach((cv) => {
                document.documentElement.style.removeProperty(`${cv}`);
            });
        };
    }, []);

    return <>{children}</>;
};
