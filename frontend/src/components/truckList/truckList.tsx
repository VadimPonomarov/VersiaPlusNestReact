import React, {memo, useCallback, useEffect, useState, useTransition} from 'react';

import {Switch, Tooltip} from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import {useEffectOnce} from "usehooks-ts";
import {v4} from 'uuid';

import {columns} from '.';
import {
    useAppDispatch,
    useAppSelector,
    truckList,
    setChecked,
    deleteChecked,
    toggleCheckedAll,
    setTruckMarkerToList,
    removeTruckMarkerFromList,
    truckParserToggle,
} from '../../storage';
import {_axiosService} from "../../storage/services";
import {ITruck} from '../../storage/slices/truck-slice/interfaces';

const _TruckList = () => {
    const dispatch = useAppDispatch();
    const {trucks, checked, checkedAll} = useAppSelector(state => state.truck);
    const [parse, setParse] = useState<boolean | undefined>();
    const getTruckList = () => {
        dispatch(truckList());
    };
    const fetchParserState = async () => await _axiosService.getTruckParserToggle();

    const [filtered, setFiltered] = useState(trucks);
    const [pending, startTransition] = useTransition();

    const filterHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        startTransition(() => {
            const candidate: ITruck[] = trucks
                .filter(truck =>
                    truck.name.toLowerCase()
                        .match(e.target.value.toLowerCase())
                );
            setFiltered(candidate);
        });
    };

    const _setChecked = useCallback((idList: number[]) => {
        dispatch(setChecked(idList));
    }, [dispatch]);
    const _deleteChecked = useCallback((idList: number[]) => {
        dispatch(deleteChecked(idList));
    }, [dispatch]);

    const _toggleCheckedAll = useCallback(() => {
        const _idList = trucks.map(item => item.id);
        if (!checkedAll) {
            _setChecked(_idList)
            dispatch(toggleCheckedAll())
        } else {
            _deleteChecked(_idList)
            dispatch(toggleCheckedAll())
        }
    }, [_setChecked, _deleteChecked, checkedAll, trucks, dispatch]);

    const handleCheck = (e, id: number) => {
        e.target['checked'] ?
            _setChecked([id]) :
            _deleteChecked([id]);

        e.target['checked'] ?
            dispatch(setTruckMarkerToList({id})) :
            dispatch(removeTruckMarkerFromList({id}));
    }

    useEffectOnce(() => {
        fetchParserState()
            .then((response) => {
                setParse(response.data.result.parsing);
            })
    })

    useEffect(() => {
        setFiltered(trucks);
    }, [trucks]);

    const setFilterNullHandler = () => {
        setFiltered(trucks);
    };

    /*-----------*/

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleTruckParseToggleChange = () => {
        dispatch(truckParserToggle());
        setParse(!parse);
    }

    const getTitle = (columnId: string, row: ITruck): string => {
        return columnId === 'Info' ? new Date(row.updatedAt).toLocaleString() : null
    }

    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <Button
                size='small'
                onClick={() => getTruckList()}
            >
                Refresh
            </Button>
            <Box>
                <Tooltip title="Toggle parser" placement="right-start">
                    <Switch
                        checked={!!parse ? parse : false}
                        onChange={
                            () => handleTruckParseToggleChange()
                        }
                    />
                </Tooltip>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow key={v4()}>
                            {columns.map((column) => (
                                <TableCell
                                    key={v4()}
                                    align={column.align}
                                    style={{width: column.minWidth, padding: "0 4px", height: "15px"}}
                                >
                                    {column.label === 'Show' &&
                                        <Checkbox
                                            defaultChecked={checkedAll}
                                            value={checkedAll}
                                            size="small"
                                            onClick={() => _toggleCheckedAll()}
                                        />}
                                    {column.label === 'Info' && ''}
                                    {column.label === 'Stop' && ''}
                                    {column.label === 'Tracing' && ''}
                                    {column.label === 'Name' &&
                                        <Box>
                                            <TextField
                                                placeholder={'Filter ...'}
                                                variant={'standard'}
                                                onChange={(e) => filterHandler(e)}
                                            />
                                        </Box>
                                    }
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtered
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (<TableRow hover role="checkbox" key={v4()}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <Tooltip
                                                    title={getTitle(column.id, row)}
                                                    placement="right-start"
                                                >
                                                    <TableCell
                                                        key={v4()}
                                                        align={column.align}
                                                        style={{padding: "0 4px", height: "15px"}}
                                                    >
                                                        {column.id === 'Show' &&
                                                            <Checkbox
                                                                defaultChecked={!!checked.includes(row.id)}
                                                                value={!!checked.includes(row.id)}
                                                                size="small"
                                                                onClick={(e) => handleCheck(e, row.id)}
                                                            />}
                                                        {column.id === 'Info' && '💬️'}
                                                        {(column.label === 'Stop' && row.stop !== null &&
                                                        row.stop.match('icon-device-stop') ?
                                                            '⛔️' : '')}
                                                        {(column.label === 'Tracing' && row.tracing !== null &&
                                                        row.tracing.match('green') ? '👁️' : '')}
                                                        {column.id === 'Name' && row.name}
                                                    </TableCell>
                                                </Tooltip>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 75, 100]}
                component="div"
                count={trucks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{display: 'flex', justifyContent: 'start'}}
            />
        </Paper>

    );
};

export const TruckList = memo(_TruckList);