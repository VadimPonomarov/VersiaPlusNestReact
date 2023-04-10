import React, {FC, memo} from 'react';

import {Container} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import {IForm} from "./interfaces/prpInterface";
import {StatusOrderEnum} from "../../../storage/slices/order-slice/interfaces";
import css from "../index.module.scss";


const _StatusControl: FC<IForm> = ({prp: {form, activeOrder, handleClick}}) => {
    const {register, formState: {errors}} = form;
    return (
        <>
            <InputLabel><small>Status</small></InputLabel>
            <FormControl fullWidth>
                <Select
                    value={activeOrder.status}
                    variant={'standard'}
                    inputProps={{
                        name: 'status',
                        id: 'status',
                    }}
                    {...register("status", {
                            required: {
                                value: true,
                                message: 'Required'
                            }
                        }
                    )
                    }
                >
                    {
                        (Object.keys(StatusOrderEnum) as (keyof typeof StatusOrderEnum)[])
                            .map((key, index) => (
                                <MenuItem
                                    key={index}
                                    value={key}
                                    onClick={e => handleClick(e, 'status')}
                                >
                                    {key}
                                </MenuItem>
                            ))
                    }
                </Select>
            </FormControl>
            <Container className={css.error}>
                {errors?.status && `${errors?.status?.message}`}
            </Container>
        </>
    );
};

export const StatusControl = memo(_StatusControl);