import React, {memo} from 'react';

import Box from "@mui/joy/Box";
import {Container, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useEffectOnce} from "usehooks-ts";

import {columns} from './config/config'
import {setAlert, useAppDispatch, useAppSelector} from "../../storage";
import {AlertTypeEnum, IAlertInfo, IAlertMessage} from "../../storage/slices/common/interfaces";
import {getTariffs, patchTariffs, updateOneLocal} from "../../storage/slices/order-slice/orderSlice";

const _Tariffs = () => {
    const {tariffs} = useAppSelector(state => state.order);
    const dispatch = useAppDispatch();

    useEffectOnce(() => {
        dispatch(getTariffs());
    })
    const handleGetClick = () => {
        dispatch(getTariffs());
    }
    const handlePatchClick = () => {
        dispatch(patchTariffs(tariffs));
    }

    const handleOnChange = (e) => {
        const val: { val: number | string } = {
            val: document
                .activeElement
                .attributes['value']
                .value
        };
        const newValueObj = {[e.field]: val || undefined};
        dispatch(updateOneLocal({...e.row, [e.field]: +newValueObj[e.field].val}));
        const alertInfo: IAlertInfo = {
            type: AlertTypeEnum.SUCCESS,
            message: IAlertMessage.SUCCESS + newValueObj[e.field].val
        };
        dispatch(setAlert(alertInfo));
    }

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '85vh',
                width: '430px',
            }}>
            <Paper>

                <Box
                    sx={{
                        border: "1px solid grey",
                        textAlign: 'right'
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'right',
                            justifyContent: 'space-around',
                            p: 1
                        }}>
                        <Typography onClick={() => handleGetClick()}>
                            ⬇️
                        </Typography>
                        <Typography>
                            TARIFFS
                        </Typography>
                        <Typography onClick={() => handlePatchClick()}>
                            ⬆️
                        </Typography>
                    </Box>
                </Box>
            </Paper>
            <DataGrid
                rows={tariffs}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 100,
                        },
                    },
                }}
                onCellEditStop={(e) => handleOnChange(e)}
                pageSizeOptions={[100]}
                disableRowSelectionOnClick
            />
        </Container>
    );
};

export const Tariffs = memo(_Tariffs);