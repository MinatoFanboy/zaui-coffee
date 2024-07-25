import React, { FC, HTMLProps, useEffect, useMemo, useRef, useState } from 'react';

import { tripUnit } from '~/utils';

export interface ElasticTextareaProps extends HTMLProps<HTMLTextAreaElement> {
    maxRows?: number;
}

export const ElasticTextarea: FC<ElasticTextareaProps> = ({ maxRows, onChange, ...props }) => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const [height, setHeight] = useState<number>(0);

    const numberOfRows = useMemo(() => {
        if (height && ref.current) {
            const styles = window.getComputedStyle(ref.current);
            const lines = height / tripUnit(styles.lineHeight);

            return Math.ceil(lines);
        }

        return 1;
    }, [height]);

    const maxHeight = useMemo(() => {
        if (ref.current) {
            const styles = window.getComputedStyle(ref.current);
            return (maxRows ?? numberOfRows) * tripUnit(styles.lineHeight);
        }

        return 0;
    }, []);

    const adjustHeight = (el: HTMLTextAreaElement) => {
        el.style.minHeight = '0px';
        if (maxHeight && maxHeight < el.scrollHeight) {
            el.style.minHeight = `${maxHeight}px`;
        } else {
            el.style.minHeight = `${el.scrollHeight}px`;
        }

        setHeight(el.scrollHeight);
    };

    useEffect(() => {
        if (ref.current) {
            adjustHeight(ref.current);
        }
    }, []);

    return (
        <textarea
            {...props}
            onChange={(e) => {
                if (onChange) {
                    onChange(e);
                }
                adjustHeight(e.currentTarget);
            }}
            ref={ref}
            style={{ height: 'auto', maxHeight, paddingBottom: 0, paddingTop: 0, resize: 'none' }}
        />
    );
};
