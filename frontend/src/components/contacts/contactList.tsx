import React, {memo, useEffect} from 'react';

import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import Typography from "@mui/joy/Typography";
import {Paper} from "@mui/material";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {useNavigate} from "react-router-dom";
import {useEffectOnce} from "usehooks-ts";

import css from './index.module.scss';
import {useAppDispatch, useAppSelector} from "../../storage";
import {
    clearConsumerCurrent,
    deleteContact,
    getConsumers,
    setConsumerCurrentById,
    setCurrentContactById
} from "../../storage/slices/order-slice/orderSlice";

interface Column {
    id: 'label' | 'phone' | 'email' | 'viber' | 'telegram' | 'info';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {id: 'label', label: 'label', minWidth: 100},
    {id: 'phone', label: 'phone', minWidth: 100},
    {id: 'email', label: 'email', minWidth: 100},
    {id: 'viber', label: 'viber', minWidth: 100},
    {id: 'telegram', label: 'telegram', minWidth: 100},
    {id: 'info', label: 'info', minWidth: 100},
];

interface IData {
    select: unknown;
    label: string;
    phone: string;
    email: string;
    viber: string;
    telegram: string;
    info: string;
}


export const _ContactList = () => {
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(10);
        const {contacts} = useAppSelector(state => state.order.activeConsumer.profile);
        const {activeConsumer} = useAppSelector(state => state.order);
        const dispatch = useAppDispatch();
        const navigate = useNavigate();

        const handleChangePage = (event: unknown, newPage: number) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
        };
        const handleClick = async (e) => {
            e.stopPropagation();
            const payload = e.target.id.split('id')[1];
            await dispatch(setCurrentContactById(payload));
            await navigate('/consumers/contacts/contact/form');
        }

        const handleDelClick = async (e) => {
            e.stopPropagation();
            const nextConsumerId = activeConsumer.id;
            const _id = await e.target.id.split('del')[1];
            const payload = await contacts.find(item => item.id === +_id);
            await dispatch(deleteContact(_id));
            await dispatch(getConsumers());
            await dispatch(clearConsumerCurrent());
        }

        return (
            <Paper className={css.table_list} sx={{width: '100%', overflow: 'hidden'}}>
                <TableContainer sx={{maxHeight: 440}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align={"center"}
                                    style={{minWidth: 25}}
                                >
                                    💥 Del
                                </TableCell>
                                <TableCell
                                    align={"center"}
                                    style={{minWidth: 25}}
                                >
                                    🎫 Form
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contacts
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                        >
                                            <TableCell key={'my_del_cell'}
                                                       align={'center'}>
                                                <Typography
                                                    id={'del' + row.id}
                                                    sx={{zIndex: 1001}}
                                                    onClick={e => handleDelClick(e)}
                                                >
                                                    💥
                                                </Typography>
                                            </TableCell>
                                            <TableCell key={'my_cell'}
                                                       align={'center'}>
                                                <Typography
                                                    id={'id' + row.id}
                                                    sx={{zIndex: 1001}}
                                                    onClick={e => handleClick(e)}
                                                >
                                                    🎫
                                                </Typography>
                                            </TableCell>
                                            {
                                                columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell
                                                                key={column.id}
                                                                align={column.align}
                                                            >
                                                                {
                                                                    column.format &&
                                                                    typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : value
                                                                }
                                                            </TableCell>
                                                        );
                                                    }
                                                )
                                            }
                                        </TableRow>
                                    )
                                        ;
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={contacts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
;

export const ContactList = memo(_ContactList);