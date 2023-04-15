import React, {memo, useState} from 'react';

import {Box, Chip} from '@mui/material';
import {v4} from 'uuid';

import {iconsEnum} from '../../icons';
import {deleteOneFromBusyList, useAppDispatch, useAppSelector} from '../../storage';
import {IExecutorTruck} from '../../storage/slices/order-slice/interfaces';
import {deleteExecutorTruck, setOrderList} from '../../storage/slices/order-slice/orderSlice';

const _ExecutorList = () => {
    const {activeOrder, activeOrder: {executors}} = useAppSelector(state => state.order)
    const dispatch = useAppDispatch();
    const handleRemoveTruck = (payload: {
        orderId: string,
        truck: IExecutorTruck
    }) => {
        dispatch(deleteExecutorTruck(payload));
        dispatch(setOrderList(activeOrder));
        dispatch(deleteOneFromBusyList(payload.truck));
    }
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', m: 1}}>
            {!!executors.length &&
                executors.map(item =>
                    <Box key={v4()} sx={{display: 'flex', alignItems: 'center'}}>
                        <Chip
                            sx={{margin: '2px', width: '100%'}}
                            label={`🚚 ${item.name}`}
                        />
                        <span
                            onClick={
                                () => handleRemoveTruck({
                                        orderId: activeOrder.id,
                                        truck: item
                                    }
                                )}
                        >
                            💥
                        </span>
                    </Box>
                )}
        </Box>
    );
};

export const ExecutorList = memo(_ExecutorList);