import {GridColDef} from "@mui/x-data-grid";

export const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 70,
        editable: false,
        align: 'left'
    },
    {
        field: 'from',
        headerName: 'FROM',
        width: 70,
        editable: false,
        align: 'center'
    },
    {
        field: 'upto',
        headerName: 'UPTO',
        width: 70,
        editable: false,
        align: 'center'
    },
    {
        field: 'tariff',
        headerName: 'TARIFF',
        width: 70,
        editable: true,
        align: 'center'
    },
    {
        field: 'value',
        headerName: 'VALUE',
        width: 70,
        editable: true,
        align: 'center'
    },
];