import React, {FC, memo} from 'react';

import {Container, Input} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";

import {IForm} from "./interfaces/prpInterface";
import css from "../index.module.scss";

const _TruckNumber: FC<IForm> = ({prp: {form, activeOrder}}) => {
    const {register, formState: {errors}} = form;
    return (
        <>
            <InputLabel><small>Truck number</small></InputLabel>
            <Input
                sx={{width: '40px'}}
                type={'number'}
                defaultValue={activeOrder.truckNumber}
                {...register("truckNumber", {
                        required: {
                            value: true,
                            message: 'Required'
                        },
                        min: {
                            value: 1,
                            message: 'min value 1'
                        }
                    }
                )
                }
            />
            <Container className={css.error}>
                {errors?.truckNumber && `${errors?.truckNumber?.message}`}
            </Container>
        </>
    );
};

export const TruckNumber = memo(_TruckNumber);