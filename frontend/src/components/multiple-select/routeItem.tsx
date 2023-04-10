import React, {memo} from 'react';

import {Paper} from "@mui/material";
import {useEffectOnce} from "usehooks-ts";

import {useAppSelector} from "../../storage";
import {IOrder} from "../../storage/slices/order-slice/interfaces";

interface IProps {
    row: IOrder
}

const _RouteItem = (props: IProps) => {
    const {orders} = useAppSelector(state => state.order);
    const {id} = props.row

    const _orderById =
        (id: string) => orders
            .find(item => item.id === id)


    return (
        <Paper sx={{p: 1, fontSize: '9px'}}>
            {JSON.stringify(_orderById(id))}
        </Paper>
    )
};

export const RouteItem = memo(_RouteItem);