import {GridColDef} from "@mui/x-data-grid";

export const columns: GridColDef[] = [
    {
        field: 'nick',
        headerName: '👨‍👨‍👦‍👦',
        type: 'string',
        width: 220,
        editable: true,
        align: "left",
        headerAlign: "left"
    },
    {
        field: 'phones',
        headerName: '☎️ Phone list',
        type: 'string',
        width: 5,
        editable: true,
        disableColumnMenu: true,
        disableReorder: true,
        hideSortIcons: true,
        align: "center",
        headerAlign: "center"
    },
    {
        field: 'edit',
        headerName: '💬 Edit contact form',
        type: 'string',
        width: 5,
        editable: true,
        disableColumnMenu: true,
        disableReorder: true,
        hideSortIcons: true,
        align: "center",
        headerAlign: "center"
    },
    {
        field: 'del',
        headerName: '🛑 Delete contact by click',
        type: 'string',
        width:5 ,
        editable: true,
        disableColumnMenu: true,
        disableReorder: true,
        hideSortIcons: true,
        align: "center",
        headerAlign: "center"
    }
];