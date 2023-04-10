import React, {FC, memo} from 'react';

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

import {IForm} from "./interfaces/prpInterface";

const _IdControl: FC<IForm> = ({prp: {form, activeOrder}}) => {
    const {register} = form;
    return (
        <Box>
            <small>{activeOrder.id ? <h6>Id: {activeOrder.id}</h6> : <h3>New order</h3>}</small>
        </Box>
    );
};

export const IdControl = memo(_IdControl);