import React, {FC, memo} from 'react';

import {LinearProgress} from "@mui/joy";
import Box from "@mui/joy/Box";
import {Container} from "@mui/material";
import {Outlet} from 'react-router-dom';

import {AppDrawer, MyAppBar} from '../../components';
import {AlertInfo} from "../../components/alert/alert";
import {useAppSelector} from "../../storage";


const _MainLayout: FC = () => {
    const {isPending} = useAppSelector(state => state.common);
    return (
        <Box>
            <MyAppBar/>
            <AlertInfo/>
            <AppDrawer/>
            <Outlet/>
            {isPending && <LinearProgress/>}
        </Box>
    );
};

export const MainLayout = memo(_MainLayout);