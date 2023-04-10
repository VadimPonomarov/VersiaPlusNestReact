import React, {memo} from 'react';

import {
    Box,
    Container,
    Paper,
} from "@mui/material";
import Button from "@mui/material/Button";
import 'dayjs/locale/uk';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {v4} from 'uuid';

import {ConsumerControl} from "./formControls/ConsumerControl";
import {CreationDate} from "./formControls/CreationDate";
import {DateLoadingControl} from "./formControls/DateLoadingControl";
import {IdControl} from "./formControls/IdControl";
import {NomenclatureControl} from "./formControls/NomenclatureControl";
import {NomenclatureTypeControl} from "./formControls/NomenclatureTypeControl";
import {RouteControl} from "./formControls/RouteControl";
import {StatusControl} from "./formControls/StatusControl";
import {TruckNumber} from "./formControls/TruckNumber";
import {TruckTypeControl} from "./formControls/TruckTypeControl";
import {useAppDispatch, useAppSelector} from "../../storage";
import {initialDirectionCurrent} from "../../storage/slices/directions-slice/constants";
import {IOrder} from "../../storage/slices/order-slice/interfaces";
import {
    alterOrderCurrent,
    setOnSubmit,
    setOrderCurrentInitial,
} from "../../storage/slices/order-slice/orderSlice";

const _OrderForm = () => {
    const {consumers, activeOrder} = useAppSelector(state => state.order)
    const {directions} = useAppSelector(state => state.directions)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const form = useForm<IOrder>({
        mode: 'all',
    });
    const getDirectionById = (id: string) => {
        const item = directions.find(route => route.id === id);
        return !!item ? item : initialDirectionCurrent;
    }
    const {handleSubmit, reset, formState: {isValid, errors}} = form;

    const _reset = () => {
        dispatch(setOrderCurrentInitial());
        reset();
    };
    const onSubmit = (body) => {
        dispatch(!!activeOrder.id ?
            setOnSubmit({...activeOrder, ...body, dateCreation: Date.now()}) :
            setOnSubmit({...activeOrder, ...body, id: v4()})
        );
        navigate('/order-list');
    };
    const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, key: keyof IOrder) => {
        dispatch(alterOrderCurrent({[key]: e.nativeEvent.target['attributes']['data-value'].nodeValue}))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: keyof IOrder) => {
        dispatch(alterOrderCurrent({[key]: e.nativeEvent.target['attributes']['value'].nodeValue}))
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <Paper sx={{p: 3}}>
                    {<Button onClick={() => _reset()}>
                        Reset
                    </Button>}
                    <Container sx={{width: "360px", height: '300px', overflow: 'scroll'}}>
                        <IdControl prp={{form, activeOrder}}/>
                        <ConsumerControl prp={{consumers, form, activeOrder, handleClick}}/>
                        <StatusControl prp={{form, activeOrder, handleClick}}/>
                        <CreationDate prp={{form, activeOrder}}/>
                        <DateLoadingControl prp={{form, activeOrder, handleChange}}/>
                        <RouteControl prp={{form, activeOrder}}/>
                        <br/>
                        <TruckNumber prp={{form, activeOrder}}/>
                        <TruckTypeControl prp={{form, activeOrder, handleClick}}/>
                        <NomenclatureTypeControl prp={{form, activeOrder, handleClick}}/>
                        <NomenclatureControl prp={{form, activeOrder}}/>
                    </Container>
                    <Button
                        type={'submit'}
                        disabled={!isValid}
                    >
                        Submit
                    </Button>
                </Paper>
            </form>
        </Box>
    )
};

export const OrderForm = memo(_OrderForm);