import React, { FC, useCallback } from 'react';
import { Box, Input } from 'zmp-ui';
import { useRecoilState } from 'recoil';
import { debounce } from 'lodash';

import { keywordState } from '~/state';

export const Inquiry: FC = () => {
    const [keyword, setKeyword] = useRecoilState(keywordState);

    const handleChange = useCallback(
        debounce((keyword: string) => {
            setKeyword(keyword);
        }, 500),
        [],
    );

    return (
        <Box
            className={'bg-white ease-out flex-none transition-all'}
            p={4}
            pt={6}
            ref={
                ((el: HTMLDivElement) => {
                    setTimeout(() => {
                        if (el) {
                            el.style.paddingTop = '8px';
                        }
                    });
                }) as any
            }
        >
            <Input.Search
                allowClear
                clearable
                defaultValue={keyword}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={'Tìm nhanh đồ uống, món mới ...'}
                ref={(el) => {
                    if (!el?.input?.value) {
                        el?.focus();
                    }
                }}
            />
        </Box>
    );
};
