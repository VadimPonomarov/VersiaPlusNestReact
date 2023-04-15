import React, {memo, useCallback} from 'react';

import {Box, Checkbox, Paper} from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {v4} from 'uuid';

import {
    removeDirectionFromArray,
    setDirectionCurrent,
    setForceReRendering,
    updateDirectionInArray,
    useAppDispatch
} from '../../storage';
import {IDirection} from '../../storage/slices/directions-slice/interfaces';

interface IProps {
    list: IDirection[];
}

const _MultipleSelectList = (props: IProps) => {
    const {list} = props;
    const dispatch = useAppDispatch();

    const onClickHandler = useCallback((e, item: IDirection) => {
        e.stopPropagation();
        dispatch(setDirectionCurrent(item));
        setTimeout(async () => {
            await dispatch(setForceReRendering());
        }, 100);

    }, [dispatch]);

    const onCheckHandler = useCallback((e, item: IDirection) => {
        dispatch(updateDirectionInArray({...item, active: !item.active}));
        dispatch(setForceReRendering());
    }, [dispatch]);

    return (
        <div>
            {list.map(item => (
                    <MenuItem key={v4()} sx={{display: "flex", flexDirection: "column"}}>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Box sx={{display: "flex", flexDirection: "column"}}>
                                <Checkbox
                                    checked={item.active}
                                    size="small"
                                    onClick={(e) => onCheckHandler(e, item)}
                                />
                                <Button onClick={() => dispatch(removeDirectionFromArray(item))}>
                                    ➖
                                </Button>
                            </Box>
                            <Box onClick={(e) => onClickHandler(e, item)}>
                                <Paper sx={{p: 1}}>
                                    <div>
                                        {item.from.location}
                                    </div>
                                    {item.through &&
                                        item.through
                                            .map(item =>
                                                <small key={v4()}>
                                                    {item.location}
                                                </small>
                                            )}
                                    <div>
                                        {item.to.location}
                                    </div>
                                    <small>
                                        {item.distance}
                                    </small>
                                </Paper>
                            </Box>
                        </Box>
                    </MenuItem>
                )
            )}
        </div>
    );
};
export const MultipleSelectList = memo(_MultipleSelectList);