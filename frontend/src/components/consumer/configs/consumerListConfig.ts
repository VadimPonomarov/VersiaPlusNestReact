import {GridColDef} from "@mui/x-data-grid";

export const columns: GridColDef[] = [
    {
        field: 'nick',
        headerName: '🧑 Nick',
        type: 'string',
        width: 220,
        editable: true,
        align: "left",
        headerAlign: "left"
    },
    {
        field: 'phones',
        headerName: '☎️',
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
        headerName: '💬',
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
        headerName: '🛑',
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