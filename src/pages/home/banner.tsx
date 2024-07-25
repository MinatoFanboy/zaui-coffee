import React, { FC } from 'react';
import { Box, Swiper } from 'zmp-ui';

import { getDummyImage } from '~/utils';

export const Banner: FC = () => {
    return (
        <Box className={'bg-white'} pb={4}>
            <Swiper>
                {[1, 2, 3, 4, 5]
                    .map((i) => getDummyImage(`banner-${i}.jpg`))
                    .map((banner, i) => (
                        <Swiper.Slide className={'px-4'} key={`Banner-${i}`}>
                            <Box
                                className="w-full rounded-lg aspect-[2/1] bg-cover bg-center bg-skeleton"
                                style={{ backgroundImage: `url(${banner})` }}
                            />
                        </Swiper.Slide>
                    ))}
            </Swiper>
        </Box>
    );
};
