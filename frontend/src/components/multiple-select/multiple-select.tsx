import * as React from 'react';
import {FC, memo, useEffect, useRef, useState, useTransition} from 'react';

import {Box, Checkbox, Input, Paper, Switch} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import {MenuProps} from './config/config';
import {MultipleSelectList} from './multiple-select-list';
import {setWatchAll, useAppDispatch, useAppSelector} from '../../storage';
import {IDirection} from '../../storage/slices/directions-slice/interfaces';

const _MultipleSelect: FC = () => {
    const dispatch = useAppDispatch();
    const [filterCheck, setFilterCheck] = useState(false);
    const {directions, forceReRendering, showAllDirections} = useAppSelector(state => state.directions);
    const [filter, setFilter] = useState<string>('');
    const [filtered, setFiltered] = useState([]);
    const [pending, startTransition] = useTransition();

    useEffect(() => {
        setFiltered(directions);
    }, [directions, filterCheck, forceReRendering]);
    const filterHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        startTransition(() => {
            setFilter(e.target.value);
            const candidate: IDirection[] = directions
                .filter(item =>
                    (!filterCheck ? item.from.location.toLowerCase() : item.to.location.toLowerCase())
                        .includes(e.target.value.toLowerCase())
                );
            setFiltered(candidate);
        });
    };
    const setFilterNullHandler = () => {
        setFilter('');
        setFiltered(directions);
    };
    const filterCheckHandler = (e) => {
        e.stopPropagation()
        setFilterCheck(!filterCheck);
        setFilter('');
    };
    const onCheckAllHandler = (e) => {
        e.stopPropagation()
        dispatch(setWatchAll());
    };

    return (
        <div>
            <FormControl
                sx={{width: 300}}>
                <InputLabel id="multiple-name-label">
                </InputLabel>
                <Select
                    labelId="multiple-name-label"
                    id="multiple-name"
                    input={<Input/>}
                    MenuProps={MenuProps}
                >
                    <Box
                        sx={{display: "flex", alignItems: 'center', justifyContent: 'start'}}>
                        <Box sx={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>
                            <Checkbox
                                checked={showAllDirections}
                                size="small"
                                onChange={(e) => onCheckAllHandler(e)}
                            />
                            <Switch
                                checked={filterCheck}
                                size="small"
                                onChange={(e) => filterCheckHandler(e)}
                            />
                        </Box>
                        <Paper sx={{zIndex: 1020}}>
                            <Input
                                id={'inputId'}
                                value={filter}
                                placeholder={`Filter list ${(!filterCheck ? 'from ' : 'to ')}...`}
                                onChange={(e) => filterHandler(e)}
                                onDoubleClick={() => setFilterNullHandler()}
                                sx={{minWidth: "120px", zIndex: 1021, width: '100%'}}
                            />
                        </Paper>
                    </Box>
                    {!!filtered.length &&
                        <MultipleSelectList list={filtered}/>
                    }
                </Select>
            </FormControl>
        </div>
    );
};

export const MultipleSelect = memo(_MultipleSelect);