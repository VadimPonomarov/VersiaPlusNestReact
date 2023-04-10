import React, {FC, memo} from 'react';

import {Container} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {v4} from 'uuid';

import {IForm} from "./interfaces/prpInterface";
import {NomenclatureTypeEnum} from "../../../storage/slices/order-slice/interfaces";
import css from "../index.module.scss";


const _NomenclatureTypeControl: FC<IForm> = ({prp: {form, activeOrder, handleClick}}) => {
    const {register, formState: {errors}} = form;
    return (
        <>
            <InputLabel><small>Nomenclature type</small></InputLabel>
            <FormControl fullWidth>
                <Select
                    variant={'standard'}
                    value={activeOrder.nomenclatureType}
                    inputProps={{
                        name: 'nomenclatureType',
                        id: 'nomenclatureType',
                        multiple: false
                    }}
                    {...register("nomenclatureType", {
                        required: {
                            value: true,
                            message: 'Required'
                        }
                    })}
                >
                    {
                        (Object.keys(NomenclatureTypeEnum) as (keyof typeof NomenclatureTypeEnum)[])
                            .map((key, index) => (
                                <MenuItem
                                    key={v4()}
                                    value={key}
                                    onClick={e => handleClick(e, 'nomenclatureType')}
                                >
                                    {key}
                                </MenuItem>
                            ))
                    }
                </Select>
            </FormControl>
            <Container className={css.error}>
                {errors?.nomenclatureType && `${errors?.nomenclatureType?.message}`}
            </Container>
        </>
    );
};

export const NomenclatureTypeControl = memo(_NomenclatureTypeControl);