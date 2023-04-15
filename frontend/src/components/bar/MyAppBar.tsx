import React, {FC, memo, useEffect, useState} from 'react';


import {
    AccountCircle,
    Menu as MenuIcon,
    ListAlt as ListAltIcon,
    DriveFolderUpload as DriveFolderUploadIcon,
    Home as HomeIcon
} from "@mui/icons-material";
import {AppBar, Box, FormControlLabel, FormGroup, IconButton, Menu, MenuItem, Switch, Toolbar} from "@mui/material";
import {Link, NavLink, useNavigate} from "react-router-dom";

import css from './index.module.scss';
import {changeDrawer, setIsAuth, useAppDispatch, useAppSelector} from '../../storage';
import {config} from '../truckList';

const _AppBar: FC = () => {
    const {isAuth} = useAppSelector(state => state.auth);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuCurrent, setMenuCurrent] = useState<string | null>(null)
    const {isOpened, width} = useAppSelector(state => state.drawer.drawer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            dispatch(setIsAuth(false));
            dispatch(changeDrawer({drawer: {width: "0px", isOpened: false}}));
            navigate("/logout");
        } else {
            navigate("/login");
        }
    };
    const {width: drawerWidth} = useAppSelector(state => state.drawer.drawer);

    const [_width, setWidth] = useState<string>();

    useEffect(() => {
        setWidth((+width.split('px')[0] - 6) + "px");
    }, [width])


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMenuCurrent(event.currentTarget.id);
        setAnchorEl(event.currentTarget);
    };

    const handleNavigate = (url: string) => {
        navigate(url);
        handleClose();
    }
    const handleClose = () => {
        setMenuCurrent(null);
        setAnchorEl(null);
    };

    const handleClickMenuIcon: React.MouseEventHandler<HTMLButtonElement> =
        (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!isAuth) return;
            if (drawerWidth !== '0px') {
                dispatch(changeDrawer({drawer: {width: "0px", isOpened: false}}))
            } else {
                +width.split('px')[0] < config.initialWidth ?
                    dispatch(changeDrawer({drawer: {width: config.initialWidth + 'px', isOpened: true}})) :
                    dispatch(changeDrawer({drawer: {isOpened: true}}));
            }
        }

    return (
        <Box sx={{
            flexGrow: 1,
            marginBottom: '5px',
            marginLeft: isOpened ? _width : null,
        }}>
            <AppBar id={'appBarId'} position={'static'}>
                <Toolbar
                    className={css.toolbar}
                >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={
                            (e) =>
                                handleClickMenuIcon(e)
                        }
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Box
                        display={"flex"}
                        alignItems={'center'}
                    >
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={!!isAuth}
                                        onChange={(e) => handleChange(e)}
                                        aria-label="login switch"
                                    />
                                }
                                label={!isAuth ? 'Login' : 'Logout'}
                            />
                        </FormGroup>
                        {isAuth && (
                            <div>
                                <IconButton
                                    id="menu-home-icon"
                                    size="large"
                                    aria-haspopup="true"
                                    onClick={(e) => navigate('/')}
                                    color="inherit"
                                >
                                    <HomeIcon/>
                                </IconButton>
                                <IconButton
                                    id="menu-catalogue-icon"
                                    size="large"
                                    aria-label="account"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={(e) => handleMenu(e)}
                                    color="inherit"
                                >
                                    <DriveFolderUploadIcon/>
                                </IconButton>
                                <Menu
                                    id="menu-catalogue"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(menuCurrent === 'menu-catalogue-icon')}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={() => handleNavigate('consumers')}>
                                        Consumers
                                    </MenuItem>
                                    <MenuItem disabled={true} onClick={() => handleNavigate('nomenclature')}>
                                        Nomenclature
                                    </MenuItem>
                                    <MenuItem onClick={() => handleNavigate('tariffs')}>
                                        Tariffs
                                    </MenuItem>
                                </Menu>
                            </div>
                        )}
                        {isAuth && (
                            <div>
                                <IconButton
                                    id="menu-order-icon"
                                    size="large"
                                    aria-label="account"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={(e) => handleMenu(e)}
                                    color="inherit"
                                >
                                    <ListAltIcon/>
                                </IconButton>
                                <Menu
                                    id="menu-order"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(menuCurrent === 'menu-order-icon')}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={() => handleNavigate('order')}>
                                        Form
                                    </MenuItem>
                                    <MenuItem onClick={() => handleNavigate('order-list')}>
                                        Order-List
                                    </MenuItem>
                                </Menu>
                            </div>
                        )}

                        {isAuth && (
                            <div>
                                <IconButton
                                    id="menu-appbar-icon"
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={menuCurrent === 'menu-appbar-icon'}
                                    onClose={handleClose}
                                >
                                    <MenuItem disabled={true} onClick={handleClose}>
                                        Profile
                                    </MenuItem>
                                    <MenuItem disabled={true} onClick={handleClose}>
                                        My account
                                    </MenuItem>
                                    <MenuItem>
                                        <NavLink
                                            to='http://localhost:8080'
                                            style={{textDecoration: 'none'}}
                                        >
                                            DB client
                                        </NavLink>
                                    </MenuItem>
                                    <MenuItem>
                                        <NavLink
                                            to='http://localhost:3001/api'
                                            style={{textDecoration: 'none'}}
                                        >
                                            Swagger
                                        </NavLink>
                                    </MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export const MyAppBar = memo(_AppBar);