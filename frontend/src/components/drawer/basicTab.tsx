import * as React from 'react';
import {memo} from 'react';

import {Divider} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';


import {useAppSelector} from '../../storage';
import {ExecutorList, OrderForm, TruckList} from '../index';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

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
                    <Box>{children}</Box>
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

export const _BasicTabs = () => {
    const [value, setValue] = React.useState(0);
    const {activeOrder} = useAppSelector(state => state.order);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%', height: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Truck list" {...a11yProps(0)} />
                    {!!activeOrder.id && <Tab label="Active Order" {...a11yProps(1)} />}
                    {/*<Tab label="Item Three" {...a11yProps(2)} />*/}
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <TruckList/>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <Box>
                    <ExecutorList/>
                    <OrderForm/>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </Box>
    );
}

export const BasicTabs = memo(_BasicTabs);

