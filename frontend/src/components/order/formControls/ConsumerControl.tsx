import React, {FC, memo} from 'react';

import {Container} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {NavLink, useNavigate} from "react-router-dom";
import {v4} from 'uuid';

import {IForm} from "./interfaces/prpInterface";
import css from "../index.module.scss";

const _ConsumerControl: FC<IForm> = ({prp: {consumers, form, activeOrder, handleClick}}) => {
    const {register, formState: {errors}} = form;
    const navigate = useNavigate();
    const getConsumerById = (id: string | number) => {
        const isExist = consumers.find(item => item.id === id).nick;
        return isExist ? isExist : '-- Consumer --'
    }

    return (
        <>
            <InputLabel>
                <NavLink to={'/consumers'} target="_blank">
                    <small>Consumer</small>
                </NavLink>
            </InputLabel>
            <FormControl fullWidth>
                <Select
                    value={activeOrder.consumer}
                    variant={'standard'}
                    {...register("consumer", {
                            required: {
                                value: true,
                                message: 'Required'
                            }
                        }
                    )}
                >
                    {!!consumers.length && consumers.map(item => (
                        <MenuItem
                            key={v4()}
                            value={item.nick}
                            onClick={e => handleClick(e, 'consumer')}
                        >
                            {item.nick}
                        </MenuItem>
                    ))
                    }
                </Select>
            </FormControl>
            <Container className={css.error}>
                {errors?.consumer && `${errors?.consumer?.message}`}
            </Container>
        </>
    );
};

export const ConsumerControl = memo(_ConsumerControl);