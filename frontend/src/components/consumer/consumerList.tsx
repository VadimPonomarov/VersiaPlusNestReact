import React, {memo} from 'react';

import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';
import {useNavigate} from "react-router-dom";
import {useEffectOnce} from "usehooks-ts";

import {columns} from './configs/consumerListConfig';
import css from './index.module.scss';
import {useAppDispatch, useAppSelector} from "../../storage";
import {
    clearConsumerCurrent,
    deleteConsumer,
    getConsumers,
    setConsumerCurrentById
} from "../../storage/slices/order-slice/orderSlice";

interface IProps {
}

const _ConsumerList = () => {
    const {consumers} = useAppSelector(state => state.order);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffectOnce(() => {
        dispatch(clearConsumerCurrent());
        dispatch(getConsumers())
    })

    const handleCellClick = async (e) => {
        await dispatch(setConsumerCurrentById(e.row.id));
        switch (e.field) {
            case 'edit':
                navigate('form');
                break;
            case 'phones':
                navigate('/consumers/contacts');
                break;
            case 'del':
                await dispatch(deleteConsumer(e.row.id));
                await dispatch(getConsumers());
                break;
            default:
        }
    }

    return (
        <Box className={css.form} sx={{height: '400px', width: '370px'}}>
            <DataGrid
                rows={consumers.map(item => ({
                        id: item.id,
                        nick: `🧑 ${item.nick}`,
                        phones: '***',
                        del: '💥',
                        edit: '***'
                    })
                )}
                columns={columns}
                onCellClick={(e) => handleCellClick(e)}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
            />
        </Box>
    );
};

export const ConsumerList = memo(_ConsumerList);