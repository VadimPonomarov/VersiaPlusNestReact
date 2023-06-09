import React, {FC, memo, useCallback, useRef} from 'react';

import {Box, Paper} from '@mui/material';
import Drawer from '@mui/material/Drawer';

import css from './index.module.scss';
import {BasicTabs} from '..';
import {changeDrawer, useAppDispatch, useAppSelector} from '../../storage';

const _AppDrawer: FC = () => {
    const drawerRef = useRef();
    const {isOpened, width: drawerWidth, title} = useAppSelector(state => state.drawer.drawer);
    const {isAuth} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const handleDrag = useCallback((e: React.MouseEvent): void => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(changeDrawer({
                    drawer: {
                        width: `${e.clientX}px`
                    }
                }
            )
        );
    }, [dispatch]);
    const handleClickHeader = () => {
        dispatch(changeDrawer({
                    drawer: {
                        width: 0 + 'px',
                        isOpened: false
                    }
                }
            )
        )
    }

    return (
        <Drawer
            ref={drawerRef}
            sx={{
                width: drawerWidth,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                },
            }}
            variant="persistent"
            anchor="left"
            open={!!isOpened}
            onDragEnd={
                (e) =>
                    handleDrag(e)
            }
        >
            <Box draggable={true}>
                <Paper draggable={false}>
                    <Box
                        sx={{pl:2}}
                        onClick={() => handleClickHeader()}
                    >
                        <h1>
                            Header ...
                        </h1>
                    </Box>
                    <BasicTabs/>
                </Paper>
            </Box>
        </Drawer>
    );
};

export const AppDrawer = memo(_AppDrawer);