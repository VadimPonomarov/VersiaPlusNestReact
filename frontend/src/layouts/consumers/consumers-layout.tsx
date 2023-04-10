import React, {memo, useEffect} from 'react';

import BorderColorIcon from "@mui/icons-material/BorderColor";
import DvrIcon from "@mui/icons-material/Dvr";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import Typography from "@mui/joy/Typography";
import {Tooltip} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {Outlet, useLocation, useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../storage";
import {clearConsumerCurrent, getConsumers} from "../../storage/slices/order-slice/orderSlice";

const _ConsumersLayout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {activeConsumer, activeContact} = useAppSelector(state => state.order)
    const location = useLocation();
    const handleGetClick = (e): void => {
        e.stopPropagation();
        dispatch(getConsumers());
        navigate('/consumers');
    }

    const handleAddItem = (e) => {
        e.stopPropagation();
        navigate('/consumers/form');
        dispatch(clearConsumerCurrent());
    }

    return (
        <Box>
            <Container sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center'}}>
                <Box sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', padding: 0}}>
                    <Box sx={{display: 'flex'}}>
                        {!!activeConsumer.nick &&
                            <Box sx={{display: 'flex', alignItems: 'center', p: 2}}>
                                <Typography variant={'outlined'} onClick={(e) => navigate('/consumers')}>
                                    <small>🧑 {activeConsumer.nick}</small>
                                </Typography>
                            </Box>
                        }
                        {location.pathname !== '/consumers' &&
                            <Box sx={{display: 'flex', alignItems: 'center', p: 2}}>
                                <Tooltip title={'Back to the list of consumers'} placement="top">
                                    <Typography onClick={(e) => navigate('/consumers')}>
                                        ⬅️
                                    </Typography>
                                </Tooltip>
                            </Box>
                        }
                        {location.pathname === '/consumers' &&
                            <Box sx={{display: 'flex', alignItems: 'center', p: 2}}>
                                <Tooltip title={'Download from server actual consumer list'} placement="top">
                                    <Typography onClick={(e) => handleGetClick(e)}>
                                        ⬇️
                                    </Typography>
                                </Tooltip>
                                <Tooltip title={'Go to consumer create/edit FORM page'} placement="top">
                                    <Typography onClick={(e) => handleAddItem(e)}>
                                        ➕
                                    </Typography>
                                </Tooltip>
                            </Box>}
                        {!!activeConsumer.id &&
                            <Box sx={{display: 'flex', alignItems: 'center', p: 2}}>
                                <Tooltip title={'Go to create/edit consumer FORM'} placement="top">
                                    <Typography
                                        sx={{display: 'flex', alignItems: 'center'}}
                                        onClick={(e) =>
                                            navigate('/consumers/form')
                                        }>
                                        <PersonOutlineIcon/>
                                        <DvrIcon/>
                                    </Typography>
                                </Tooltip>
                            </Box>}
                        {(location.pathname !== '/consumers/contacts' && !!activeConsumer.id) &&
                            <Box sx={{display: 'flex', alignItems: 'center', p: 2}}>
                                <Tooltip title={'Current consumer`s list of contacts'} placement="top">
                                    <Typography sx={{display: 'flex', alignItems: 'center'}}
                                                onClick={(e) =>
                                                    navigate('/consumers/contacts')
                                                }
                                    >
                                        <RecentActorsIcon/>
                                        <DvrIcon/>
                                    </Typography>
                                </Tooltip>
                            </Box>}
                        {((location.pathname !== '/consumers/contacts/contact/form' && !!activeContact.id) ||
                                (location.pathname === '/consumers/contacts' && !!activeConsumer.id)) &&
                            <Box sx={{display: 'flex', alignItems: 'center', p: 2}}>
                                <Tooltip title={'Go to current consumer create/edit contact FORM'} placement="top">
                                    <Box sx={{display:'flex'}}>
                                        <Typography onClick={(e) => navigate('/consumers/contacts/contact/form')}>
                                            ➕
                                        </Typography>
                                        <Typography sx={{display: 'flex', alignItems: 'center'}}
                                                    onClick={(e) =>
                                                        navigate('/consumers/contacts/contact/form')
                                                    }
                                        >
                                            <BorderColorIcon/>
                                            <RecentActorsIcon/>
                                        </Typography>
                                    </Box>
                                </Tooltip>
                            </Box>
                        }
                    </Box>
                </Box>
                <Outlet/>
            </Container>
        </Box>
    );
};

export const ConsumersLayout = memo(_ConsumersLayout);