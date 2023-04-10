import React, {FC, memo, useEffect, useState, useTransition} from 'react';

import {Box, Container, Input, MenuItem, Paper, Select, Switch} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {NavLink, useNavigate} from "react-router-dom";
import {v4} from 'uuid';

import {IForm} from "./interfaces/prpInterface";
import {useAppDispatch, useAppSelector} from "../../../storage";
import {IDirection} from "../../../storage/slices/directions-slice/interfaces";
import {alterOrderCurrent} from "../../../storage/slices/order-slice/orderSlice";
import {RoutePanel} from "../../route-panel/routePanel";
import css from "../index.module.scss";

const _RouteControl: FC<IForm> = ({prp: {form, activeOrder}}) => {
    const {formState: {errors}} = form;
    const [filter, setFilter] = useState<string>('');
    const [filterCheck, setFilterCheck] = useState(false);
    const {directions} = useAppSelector(state => state.directions);
    const [filteredDirections, setFilteredDirections] = useState<IDirection[]>(directions);
    const [pending, startTransition] = useTransition();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        setFilteredDirections(directions);
    }, [filterCheck, directions]);
    const filterHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        startTransition(() => {
            setFilter(e.target.value);
            const candidate: IDirection[] = directions
                .filter(item =>
                    (!filterCheck ? item.from.location.toLowerCase() : item.to.location.toLowerCase())
                        .includes(e.target.value.toLowerCase())
                );
            setFilteredDirections(candidate);
        });
    };
    const setFilterNullHandler = () => {
        setFilter('');
        setFilteredDirections(directions);
    };
    const filterCheckHandler = () => {
        setFilterCheck(!filterCheck);
        setFilter('');
    };

    const handleRouteSelect = (e, id: string) => {
        const _route = directions.find(item => item.id === id);
        if (_route) dispatch(alterOrderCurrent({route: _route}));
    }

    return (
        <>
            <InputLabel>
                    <NavLink to={'/'} target="_blank">
                        <small>Route</small>
                    </NavLink>
            </InputLabel>
            <Box sx={{display: 'flex', width: '100%'}}>
                <FormControl variant={'standard'}>
                    <Select
                        inputProps={{
                            name: 'route',
                            id: 'route',
                        }}
                    >
                        <MenuItem
                            sx={{display: "flex", alignItems: 'center', justifyContent: 'start'}}>
                            <Box sx={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>
                                <Switch
                                    checked={filterCheck}
                                    size="small"
                                    onChange={() => filterCheckHandler()}
                                />
                            </Box>
                            <Paper>
                                <Box>
                                    <Input
                                        value={filter}
                                        placeholder={`Filter list ${(!filterCheck ? 'from ' : 'to ')}...`}
                                        onChange={(e) => filterHandler(e)}
                                        onDoubleClick={() => setFilterNullHandler()}
                                        sx={{minWidth: "120px", zIndex: 1010, width: '100%'}}
                                    />
                                </Box>
                            </Paper>
                        </MenuItem>

                        {filteredDirections.map(item => (
                                <MenuItem
                                    key={v4()}
                                    onClick={(e) => handleRouteSelect(e, item.id)}
                                    sx={{display: "flex", flexDirection: "column"}}
                                >
                                    <RoutePanel route={item}/>
                                </MenuItem>
                            )
                        )}
                    </Select>
                </FormControl>

                <Container>
                    <RoutePanel route={activeOrder.route}/>
                </Container>
            </Box>

            <Container className={css.error}>
                {errors?.route && `${errors?.route?.message}`}
            </Container>
        </>
    );
};

export const RouteControl = memo(_RouteControl);