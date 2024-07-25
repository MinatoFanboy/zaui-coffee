import React, { FC, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Picker } from 'zmp-ui';

import { selectedDeliveryTimeState } from '~/state';
import { displayDate, displayHalfAnHourTimeRange, matchStatusBarColor } from '~/utils';

export const TimePicker: FC = () => {
    const [date, setDate] = useState<number>(+new Date());
    const [time, setTime] = useRecoilState(selectedDeliveryTimeState);

    const avaiableDates = useMemo(() => {
        const days: Date[] = [];
        const today = new Date();

        for (let i = 0; i < 5; i++) {
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + i);
            days.push(nextDay);
        }

        return days;
    }, []);

    const avaiableTimes = useMemo(() => {
        const times: Date[] = [];
        const now = new Date();
        let time = new Date();
        if (now.getDate() === new Date(date).getDate()) {
            const minutes = Math.ceil(now.getMinutes() / 30) * 30;
            time.setHours(now.getHours());
            time.setMinutes(minutes);
        } else {
            time.setHours(7);
            time.setMinutes(0);
        }
        time.setSeconds(0);
        time.setMilliseconds(0);

        const endTime = new Date();
        endTime.setHours(21);
        endTime.setMinutes(0);
        endTime.setSeconds(0);
        endTime.setMilliseconds(0);
        while (time <= endTime) {
            times.push(new Date(time));
            time.setMinutes(time.getMinutes() + 30);
        }

        return times;
    }, []);

    return (
        <Picker
            data={[
                {
                    options: avaiableTimes.map((time, i) => ({
                        displayName: displayHalfAnHourTimeRange(time),
                        value: +time,
                    })),
                    name: 'time',
                },
                {
                    options: avaiableDates.map((date, i) => ({
                        displayName: displayDate(date),
                        value: +date,
                    })),
                    name: 'date',
                },
            ]}
            formatPickedValueDisplay={({ date, time }) =>
                date && time
                    ? `${displayHalfAnHourTimeRange(new Date(time.value))}, ${displayDate(new Date(time.value))}`
                    : 'Chọn thời gian'
            }
            inputClass={'bg-transparent border-none font-medium h-auto m-0 p-0 text-md text-primary text-sm'}
            mask
            maskClosable
            onChange={({ date, time }) => {
                if (date) {
                    setDate(+date.value);
                }
                if (time) {
                    setTime(+time.value);
                }
            }}
            onVisibilityChange={(visible) => matchStatusBarColor(visible)}
            placeholder={'Chọn thời gian nhận hàng'}
            title={'Thời gian nhận hàng'}
            value={{ date, time: avaiableTimes.find((t) => +t === time) ? time : +avaiableTimes[0] }}
        />
    );
};
