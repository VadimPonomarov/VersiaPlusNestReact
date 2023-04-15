import React, {FC, memo} from 'react';

import {Container, Input, TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {format} from 'date-fns';

import {IForm} from "./interfaces/prpInterface";
import css from "../index.module.scss";

const _DateLoadingControl: FC<IForm> = ({prp: {form, activeOrder, handleChange}}) => {
    const {register, formState: {errors}} = form;
    return (
        <>
            <InputLabel><small>Shipment date</small></InputLabel>
            <FormControl sx={{
                width: "100%",
            }}>
                <Input
                    onChange={e => handleChange(e, 'dateLoading')}
                    defaultValue={activeOrder.dateLoading}
                    type={'date'}

                    {...register("dateLoading", {
                        required: {
                            value: true,
                            message: 'Required'
                        }
                    })}
                />
            </FormControl>
            <Container className={css.error}>
                {errors?.dateLoading && `${errors?.dateLoading?.message}`}
            </Container>
        </>
    );
};

export const DateLoadingControl = memo(_DateLoadingControl);