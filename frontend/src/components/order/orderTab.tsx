import * as React from 'react';
import {memo, useCallback, useEffect} from "react";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import {useLocation} from "react-router-dom";
import {useEffectOnce} from "usehooks-ts";

import {OrderForm} from "./orderForm";
import {useAppDispatch, useAppSelector} from "../../storage";
import {
    setOrderCurrentById,
    setOrderCurrentInitial,
} from "../../storage/slices/order-slice/orderSlice";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {activeOrder} = useAppSelector(state => state.order);
    const {children, value, index, ...other} = props;
    const dispatch = useAppDispatch();
    const _location = useLocation();

    useEffectOnce(() => {
        const id = _location.pathname.split('/')[2];
        if (!!id) {
            dispatch(setOrderCurrentById(id))
        } else {
            dispatch(setOrderCurrentInitial());
        }
    })

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const _OrderTab = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                borderBottom: 1,
                borderColor: 'divider',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Order Form" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}/>
            <TabPanel value={value} index={1}/>
            <TabPanel value={value} index={2}/>
            {value === 0 && <OrderForm/>}

        </Box>
    );
};

export const OrderTab = memo(_OrderTab);