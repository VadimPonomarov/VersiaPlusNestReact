import React, {FC, memo} from 'react';

import {Container, NativeSelect} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import {IForm} from "./interfaces/prpInterface";
import {TruckTypeEnum} from "../../../storage/slices/truck-slice/interfaces";
import css from "../index.module.scss";



const _TruckTypeControl: FC<IForm> = ({prp: {form, activeOrder, handleClick}}) => {
    const {register, formState: {errors}} = form;
    return (
        <>
            <InputLabel><small>Truck type</small></InputLabel>
            <FormControl fullWidth>
                <Select
                    variant={'standard'}
                    value={activeOrder.truckType}
                    inputProps={{
                        name: 'truckType',
                        id: 'truckType',
                    }}
                    {...register("truckType", {
                            required: {
                                value: true,
                                message: 'Required'
                            }
                        }
                    )
                    }
                >
                    {
                        (Object.keys(TruckTypeEnum) as (keyof typeof TruckTypeEnum)[])
                            .map((key, index) => (
                                <MenuItem
                                    key={index}
                                    value={key}
                                    onClick={e => handleClick(e, 'truckType')}
                                >
                                    {key}
                                </MenuItem>
                            ))
                    }
                </Select>
            </FormControl>
            <Container className={css.error}>
                {errors?.truckType && `${errors?.truckType?.message}`}
            </Container>
        </>
    );
};

export const TruckTypeControl = memo(_TruckTypeControl);