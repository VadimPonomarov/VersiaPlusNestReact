import * as React from 'react';
import {memo, useEffect, useMemo, useState} from "react";

import {AccountCircle, Send} from "@mui/icons-material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RvHookupIcon from '@mui/icons-material/RvHookup';
import {Box, Button, ListItemIcon, MenuItem} from '@mui/material';
import {format, parse} from 'date-fns';
import {ExportToCsv} from 'export-to-csv';
import MaterialReactTable, {type MRT_ColumnDef, type MRT_Row} from 'material-react-table';
import {useNavigate} from "react-router-dom";
import {useEffectOnce} from "usehooks-ts";
import {v4} from 'uuid';

import {iconsEnum} from "../../icons";
import {
    deleteOneFromBusyList,
    setDirectionCurrent,
    setNoWatchAll,
    updateDirectionInArray,
    useAppDispatch,
    useAppSelector
} from "../../storage";
import {IDirection} from "../../storage/slices/directions-slice/interfaces";
import {IExecutorTruck, IOrder} from '../../storage/slices/order-slice/interfaces';
import {
    deleteExecutorTruck,
    deleteOrderList,
    setOrderCurrentById,
    setOrderList
} from "../../storage/slices/order-slice/orderSlice";
import {RoutePanel} from "../route-panel/routePanel";

const _OrderList = () => {
    const {orders, activeOrder} = useAppSelector(state => state.order);
    const [filteredOrders, setFiltered] = useState<IOrder[]>([]);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setFiltered(orders)
    }, [orders])

    const csvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
    };

    const csvExporter = new ExportToCsv(csvOptions);
    const handleExportRows = (rows: MRT_Row<IOrder>[]) => {
        csvExporter.generateCsv(rows.map((row) => {
            return row.original
        }));
    };

    const handleExportData = () => {
        csvExporter.generateCsv(orders);
    };
    const handleRowSelect = (e) => {
        e.stopPropagation();
    }

    const columns = useMemo<MRT_ColumnDef<IOrder>[]>(
        () => [
            {
                id: 'id',
                header: '',
                columns: [
                    {
                        accessorFn: (row) => `${row.id}`,
                        id: 'id',
                        header: 'Id',
                        maxSize: 20,
                        Cell: ({renderedCellValue, row}) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '1rem',
                                    fontSize: 14,
                                    maxSize: '20px',
                                }}
                            >
                                Id
                                <span>
                                    {renderedCellValue}
                                </span>
                            </Box>
                        ),
                    },
                    {
                        accessorKey: 'dateCreation',
                        header: 'Created at',
                        filterFn: 'customFilterFnCreation',
                        renderColumnFilterModeMenuItems: ({column, onSelectFilterMode}) => [
                            <MenuItem
                                key="Equal"
                                onClick={() => onSelectFilterMode('customFilterFnCreation')}
                            >
                                Exact
                            </MenuItem>,
                        ],
                        Cell: ({renderedCellValue, row}) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '1rem',
                                    fontSize: 14,
                                    maxSize: '20px',
                                }}
                            >
                                      <span>
                                         {new Date(row.original.dateCreation).toLocaleDateString()}
                                      </span>
                            </Box>
                        ),
                    },
                    {
                        accessorKey: 'status',
                        header: 'Status',
                    },
                    {
                        accessorKey: 'dateLoading',
                        header: 'Date of loading',
                        filterVariant: 'text',
                        filterFn: 'customFilterFnLoading',
                        renderColumnFilterModeMenuItems: ({column, onSelectFilterMode}) => [
                            <MenuItem
                                key="Equal"
                                onClick={() => onSelectFilterMode('customFilterFnLoading')}
                            >
                                Exact
                            </MenuItem>,
                        ],
                        Cell: ({renderedCellValue, row}) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '1rem',
                                    fontSize: 14,
                                    maxSize: '20px',
                                }}
                            >
                                {new Date(Date.parse(row.original.dateLoading)).toLocaleDateString()}
                            </Box>
                        ),
                    },
                    {
                        accessorKey: 'consumer',
                        enableClickToCopy: true,
                        header: 'Consumer',
                    },
                    {
                        accessorKey: 'truckType',
                        header: 'Truck type',
                    },
                    {
                        accessorKey: 'truckNumber',
                        header: 'Number',
                    },
                    {
                        accessorKey: 'distance',
                        header: 'Distance',
                    },
                    {
                        accessorKey: 'tariff',
                        header: 'Tariff',
                    },
                ],
            },
        ],
        [],
    );

    const handleEdit = (id: string) => {
        dispatch(setOrderCurrentById(id));
        navigate(`/order/${id}`);
    }
    const handleProcess = (route: IDirection, order: IOrder) => {
        dispatch(setDirectionCurrent({...route, active: true}));
        dispatch(setNoWatchAll());
        dispatch(updateDirectionInArray({...route, active: true}));
        dispatch(setOrderCurrentById(order.id))
        navigate('/');
    }
    const handleDoubleClick = (e, payload: {
        orderId: string,
        truck: IExecutorTruck
    }) => {
        dispatch(deleteExecutorTruck(payload));
        dispatch(setOrderList(activeOrder));
        dispatch(deleteOneFromBusyList(payload.truck));
    }

    const getExecutorsByOrderId = (id: string): IExecutorTruck[] => {
        const res = filteredOrders.find(item => item.id === id);
        if (!!res.executors.length) return res.executors;
        return []
    }

    const handleDelete = (order: IOrder) => {
        dispatch(deleteOrderList(order))
    }

    return (
        <MaterialReactTable
            columns={columns}
            data={filteredOrders}
            enableRowSelection
            enableSelectAll
            enableColumnFilterModes
            enableColumnOrdering
            enableGrouping
            enablePinning
            enableRowActions
            enableFilterMatchHighlighting
            initialState={{showColumnFilters: true}}
            positionToolbarAlertBanner="bottom"
            renderTopToolbarCustomActions={({table}) => (
                <Box
                    sx={{display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap'}}
                >
                    <Button
                        color="primary"
                        //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                        onClick={handleExportData}
                        startIcon={<FileDownloadIcon/>}
                        variant="contained"
                    >
                        Export All Data
                    </Button>
                    <Button
                        disabled={table.getPrePaginationRowModel().rows.length === 0}
                        //export all rows, including from the next page, (still respects filtering and sorting)
                        onClick={() =>
                            handleExportRows(table.getPrePaginationRowModel().rows)
                        }
                        startIcon={<FileDownloadIcon/>}
                        variant="contained"
                    >
                        Export All Rows
                    </Button>
                    <Button
                        disabled={table.getRowModel().rows.length === 0}
                        //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                        onClick={() => handleExportRows(table.getRowModel().rows)}
                        startIcon={<FileDownloadIcon/>}
                        variant="contained"
                    >
                        Export Page Rows
                    </Button>
                    <Button
                        disabled={
                            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                        }
                        //only export selected rows
                        onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                        startIcon={<FileDownloadIcon/>}
                        variant="contained"
                    >
                        Export Selected Rows
                    </Button>
                </Box>
            )}

            filterFns={{
                customFilterFnCreation: (row, id, filterValue) => {
                    if (filterValue.length === 10) {
                        return filterValue === new Date(row.original.dateCreation).toLocaleDateString()
                    }
                    return true
                },

                customFilterFnLoading: (row, id, filterValue) => {
                    if (filterValue.length === 10) {
                        return filterValue === new Date(row.original.dateLoading).toLocaleDateString()
                    }
                    return true
                },

            }}
            renderDetailPanel={({row: {original: {id, route}}}) => (
                <Box
                    key={v4()}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'start',
                        width: '100vw',
                    }}
                >
                    <RoutePanel route={route}/>
                    {!!getExecutorsByOrderId(id).length && getExecutorsByOrderId(id).map(item =>
                        <Box
                            key={item.name}
                            onDoubleClick={(e) =>
                                handleDoubleClick(e, {orderId: id, truck: item})}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',

                            }}
                        >
                            <img
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    margin: '2px'
                                }}
                                src={iconsEnum.TRUCK_1}
                                alt="TruckIcon"
                            />
                            <small>
                                {item.name}
                            </small>
                        </Box>)
                    }
                </Box>
            )}
            renderRowActionMenuItems={({closeMenu, row, table}) => [
                <MenuItem
                    key={'edit'}
                    onClick={(e) =>
                        handleEdit(table.getRow(row.id).original.id)
                    }
                    sx={{
                        m: 0
                    }}
                >
                    <ListItemIcon>
                        <EditIcon/>
                    </ListItemIcon>
                    Edit
                </MenuItem>,
                <MenuItem
                    key={'process'}
                    onClick={(e) =>
                        handleProcess(table.getRow(row.id).original.route, row.original
                        )}
                    sx={{
                        m: 0
                    }}
                >
                    <ListItemIcon>
                        <RvHookupIcon/>
                    </ListItemIcon>
                    Process
                </MenuItem>,
                <MenuItem
                    key={'profile'}
                    disabled={true}
                    onClick={() => {
                        closeMenu();
                    }}
                    sx={{m: 0}}
                >
                    <ListItemIcon>
                        <AccountCircle/>
                    </ListItemIcon>
                    View Profile
                </MenuItem>,
                <MenuItem
                    key={'email'}
                    disabled={true}
                    onClick={() => {
                        closeMenu();
                    }}
                    sx={{m: 0}}
                >
                    <ListItemIcon>
                        <Send/>
                    </ListItemIcon>
                    Send Email
                </MenuItem>,
                <MenuItem
                    key={'delete'}
                    onClick={() => {
                        handleDelete(table.getRow(row.id).original);
                    }}
                    sx={{m: 0}}
                >
                    <ListItemIcon>
                        <DeleteForeverIcon/>
                    </ListItemIcon>
                    Delete
                </MenuItem>,
            ]}
        />
    );
};


export const OrderList = memo(_OrderList);