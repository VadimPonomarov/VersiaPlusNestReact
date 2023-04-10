import React, {memo} from 'react';

import {Box, Container, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../storage";
import {IContact} from "../../storage/slices/order-slice/interfaces";
import {
    clearConsumerCurrentContact, getConsumers, patchContact,
    postContact, setConsumerCurrentById,
} from "../../storage/slices/order-slice/orderSlice";
import css from "../consumer/index.module.scss";


const _ContactForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {activeContact, activeConsumer} = useAppSelector(state => state.order);
    const {register, handleSubmit, reset, formState: {errors, isValid}} =
        useForm<Partial<IContact>>({
            mode: 'onChange',
        });
    const onSubmit = async (data: IContact) => {
        const nextConsumerId = activeConsumer.id;
        const _data: IContact = {...data, id: +data.id, consumerProfileId: +activeConsumer.consumerProfileId }
        if (!!data.id) {
            await dispatch(patchContact(_data));
        } else {
            await dispatch(postContact(_data));
        }
        await dispatch(getConsumers());
        await dispatch(setConsumerCurrentById(nextConsumerId));
        await dispatch(clearConsumerCurrentContact());
        await navigate('/consumers/contacts');
    };
    const onReset = async () => {
        await dispatch(clearConsumerCurrentContact());
        await window.location.reload();
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
                <Button type={'button'} onClick={() => onReset()}>Reset</Button>
                {
                    !!activeContact.id &&
                    <>
                        <TextField
                            className={css.input}
                            label="id"
                            defaultValue={activeContact.id}
                            variant="standard"
                            {
                                ...register("id")
                            }
                        />
                        <Container className={css.error}>
                            {errors?.id && `${errors?.id?.message}`}
                        </Container>
                    </>
                }
                <TextField
                    required
                    className={css.input}
                    label="Label"
                    defaultValue={activeContact.label}
                    variant="standard"
                    {
                        ...register("label", {
                            required: true
                        })
                    }
                />
                <Container className={css.error}>
                    {errors?.label && `${errors?.label?.message}`}
                </Container>
                <TextField
                    className={css.input}
                    label="Tel"
                    defaultValue={activeContact.tel}
                    variant="standard"
                    {...register("tel", {
                        pattern: {
                            value: /\+38\(\d{3}\)\d{3}-\d{2}-\d{2}/,
                            message: 'Should be in format +38(***)***-**-**'
                        }
                    })}
                />
                <Container className={css.error}>
                    {errors?.tel && `${errors?.tel.message}`}
                </Container>
                <TextField
                    className={css.input}
                    label="Email"
                    type={'email'}
                    defaultValue={activeContact.email}
                    variant="standard"
                    {...register("email", {
                        pattern: {
                            value: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g,
                            message: 'Enter valid email'
                        }
                    })}
                />
                <Container className={css.error}>
                    {errors?.email && `${errors?.email.message}`}
                </Container>
                <TextField
                    className={css.input}
                    label="Viber"
                    defaultValue={activeContact.viber}
                    variant="standard"
                    {...register("viber",
                        {
                            pattern: {
                                value: /\+38\(\d{3}\)\d{3}-\d{2}-\d{2}/,
                                message: 'Should be in format +38(***)***-**-**'
                            }
                        }
                    )}
                />
                <Container className={css.error}>
                    {errors?.viber && `${errors?.viber.message}`}
                </Container>
                <TextField
                    className={css.input}
                    label="Telegram"
                    defaultValue={activeContact.telegram}
                    variant="standard"
                    {...register("telegram",
                        {
                            pattern: {
                                value: /(?:@|(?:(?:(?:https?:)?t(?:elegram)?).me))(\w{4,})$/g,
                                message: 'Enter valid Telegram link'
                            }
                        }
                    )}
                />
                <Container className={css.error}>
                    {errors?.telegram && `${errors?.telegram?.message}`}
                </Container>
                <TextField
                    className={css.input}
                    label="Info"
                    multiline
                    maxRows={20}
                    defaultValue={activeContact.info}
                    variant="standard"
                    {...register("info")}
                />
                <Container className={css.error}>
                    {errors?.info && `${errors?.info?.message}`}
                </Container>
                <Button type={'submit'} disabled={!isValid}>Submit</Button>
            </form>
        </Box>
    );
};

export const ContactCreateForm = memo(_ContactForm);