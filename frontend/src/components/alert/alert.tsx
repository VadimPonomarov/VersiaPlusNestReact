import React, {memo, useCallback, useEffect, useMemo} from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InfoIcon from '@mui/icons-material/Info';
import ReportIcon from '@mui/icons-material/Report';
import WarningIcon from '@mui/icons-material/Warning';
import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import {ColorPaletteProp} from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';

import {setAlert, useAppDispatch, useAppSelector} from "../../storage";

const _Alert = () => {
    const dispatch = useAppDispatch();
    const {alertInfo} = useAppSelector(state => state.common);
    const {width} = useAppSelector(state => state.drawer.drawer);
    const setAlertNull = useCallback(() => {
        setTimeout(() => {
            dispatch(setAlert(null));
        }, 1500)
    }, [dispatch])

    useEffect(() => {
        setAlertNull();
    }, [alertInfo, setAlertNull])

    const items: {
        title: string;
        color: ColorPaletteProp;
        icon: React.ReactElement;
    }[] = [
        {title: 'Success', color: 'success', icon: <CheckCircleIcon/>},
        {title: 'Warning', color: 'warning', icon: <WarningIcon/>},
        {title: 'Error', color: 'danger', icon: <ReportIcon/>},
        {title: 'Info', color: 'info', icon: <InfoIcon/>},
    ];

    const getItem = () => {
        return items.find(item => item.title === alertInfo.type);
    };

    return (
        alertInfo &&
        <Box sx={{marginLeft: width, display: 'flex', gap: 2, width: '100%', flexDirection: 'column'}}>
            <Alert
                key={getItem().title}
                sx={{alignItems: 'flex-start'}}
                startDecorator={React.cloneElement(getItem().icon, {
                    sx: {mt: '2px', mx: '4px'},
                    fontSize: 'xl2',
                })}
                variant="soft"
                color={getItem().color}
                endDecorator={
                    <IconButton variant="soft" size="sm" color={getItem().color}>
                        <CloseRoundedIcon/>
                    </IconButton>
                }
            >
                <Typography fontWeight="lg" mt={0.25}>
                    {getItem().title}: {alertInfo.message}
                </Typography>
            </Alert>
        </Box>
    );
};

export const AlertInfo = memo(_Alert);