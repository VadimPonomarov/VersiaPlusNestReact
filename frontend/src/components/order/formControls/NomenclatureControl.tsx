import React, {FC, memo, useEffect, useState} from 'react';

import Box from "@mui/joy/Box";
import {Chip, Container, Input, NativeSelect, OutlinedInput, SelectChangeEvent} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {useEffectOnce} from "usehooks-ts";
import {v4} from 'uuid';

import {IForm} from "./interfaces/prpInterface";
import {useAppDispatch, useAppSelector} from "../../../storage";
import {alterOrderCurrent} from "../../../storage/slices/order-slice/orderSlice";
import css from "../index.module.scss";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const _NomenclatureControl: FC<IForm> = ({prp: {form}}) => {
    const {register, formState: {errors}} = form;
    const {activeOrder} = useAppSelector(state => state.order);
    const dispatch = useAppDispatch();
    const [nomenclature, setNomenclature] = React.useState<string[]>([]);
    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: {value},
        } = event;
        dispatch(alterOrderCurrent({nomenclature: typeof value === 'string' ? value.split(',') : value}));
    };

    return (
        <>
            <InputLabel>
                <small>
                    Nomenclature
                </small>
            </InputLabel>
            <FormControl fullWidth>
                <Select
                    variant={'standard'}
                    multiple
                    value={activeOrder.nomenclature}
                    onChange={handleChange}
                    input={<Input/>}
                    renderValue={(selected) => (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            {selected.map((value) => (
                                <Chip key={value} label={value}/>
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {[1, 2, 3, 4, 5].map((name) => (
                        <MenuItem
                            key={v4()}
                            value={name}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Container className={css.error}>
                {errors?.nomenclature && `${errors?.nomenclature?.message}`}
            </Container>
        </>
    );
};

export const NomenclatureControl = memo(_NomenclatureControl);