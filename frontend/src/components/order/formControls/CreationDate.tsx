import React, {FC, memo} from 'react';

import {TextField} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import {format} from "date-fns";

import {IForm} from "./interfaces/prpInterface";

const _CreationDate: FC<IForm> = ({prp: {form, activeOrder}}) => {
    const {register, formState: {errors}} = form;
    return (
        <>
            <InputLabel><small>Creation date</small></InputLabel>
            <TextField
                value={!!activeOrder.dateCreation ?
                    format(new Date(activeOrder.dateCreation), 'dd.MM.yyyy hh:mm:ss:SSS') :
                    format(Date.now(), 'dd.MM.yyyy hh:mm:ss:SSS')}
                variant={'standard'}
                type={'text'}
                {...register("dateCreation")}
            />
        </>
    );
};

export const CreationDate = memo(_CreationDate);