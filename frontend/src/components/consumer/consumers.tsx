import React, {memo, useRef} from 'react';

import {Box} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import {useNavigate} from "react-router-dom";

import {ConsumerCreateForm} from "./consumerCreateForm";
import {ConsumerList} from "./consumerList";
import {useAppDispatch, useAppSelector} from "../../storage";
import {clearConsumerCurrent, getConsumers,} from "../../storage/slices/order-slice/orderSlice";
import {ContactCreateForm,} from "../contacts/contactCreateForm";
import {ContactList} from "../contacts/contactList";


const _Consumers = () => {
    const {consumers, activeConsumer} = useAppSelector(state => state.order);
    const dispatch = useAppDispatch();
    const consumerListRef = useRef<any>();
    const consumerFormRef = useRef<any>();
    const contactFormRef = useRef<any>();
    const handleClick = () => {
        dispatch(getConsumers());
    }

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

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handlePatchClick = (): void => {

    }

    return (
        <Box sx={{
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange}>

                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        margin: 1
                    }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        color: "#1976D2",
                        p: 1
                    }}>
                    </Box>
                </Box>
                <ConsumerList/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ConsumerCreateForm/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        margin: 1
                    }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        color: "#1976D2",
                        p: 1
                    }}>
                    </Box>
                    {/*<Typography>
                                ⬆️
                            </Typography>*/}
                </Box>
                <ContactList/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <ContactCreateForm/>
            </TabPanel>
        </Box>
    );
};

export const Consumers = memo(_Consumers);