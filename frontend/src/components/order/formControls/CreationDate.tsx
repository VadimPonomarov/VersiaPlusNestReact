import React, {FC, memo} from 'react';

import {FormControl, Input, TextField} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import {format} from "date-fns";

import {IForm} from "./interfaces/prpInterface";

const _CreationDate: FC<IForm> = ({prp: {form, activeOrder}}) => {
    const {register, formState: {errors}} = form;
    return (
        <>
            <InputLabel><small>Creation date</small></InputLabel>
            <FormControl sx={{
                width: "100%",
            }}>
                <Input
                    value={
                        !!activeOrder.dateCreation ?
                            new Date(activeOrder.dateCreation).toLocaleString() :
                            new Date(Date.now()).toLocaleString()
                    }
                    type={'text'}

                    {...register("dateCreation", {
                        required: {
                            value: true,
                            message: 'Required'
                        }
                    })}
                />
            </FormControl>
        </>
    );
};

export const CreationDate = memo(_CreationDate);