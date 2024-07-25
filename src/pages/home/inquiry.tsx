import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Input } from 'zmp-ui';

export const Inquiry: FC = () => {
    const navigate = useNavigate();

    return (
        <Box p={4} className={'bg-white'}>
            <Input.Search onFocus={() => navigate('/search')} placeholder={'Tìm nhanh đồ uống, món mới ...'} />
        </Box>
    );
};
