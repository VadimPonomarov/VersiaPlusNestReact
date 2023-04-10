import React, {memo,} from 'react';

import {
    Box,
    Container,
    FormLabel,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";

import css from "./index.module.scss";
import {setAlert, useAppDispatch, useAppSelector} from "../../storage";
import {AlertTypeEnum, IAlertMessage} from "../../storage/slices/common/interfaces";
import {IConsumer} from "../../storage/slices/order-slice/interfaces";
import {
    clearConsumerCurrent, getConsumers, patchConsumer, postConsumer,
} from "../../storage/slices/order-slice/orderSlice";

interface IProps {
    reffs: {
        consumerListRef: React.MutableRefObject<HTMLElement>;
        consumerFormRef: React.MutableRefObject<HTMLElement>;
        contactFormRef: React.MutableRefObject<HTMLElement>;
    }
}

const _ConsumerCreateForm = () => {
    const dispatch = useAppDispatch();
    const {consumers, activeConsumer} = useAppSelector(state => state.order);
    const {register, handleSubmit, reset, formState: {errors, isValid}, getValues} =
        useForm<IConsumer>({
            mode: 'onChange',
        });
    const onSubmit = (data: IConsumer) => {
        if (!data.id) {
            dispatch(postConsumer(data))
                .then(() => {
                    dispatch(getConsumers());
                })
                .then(() =>
                    dispatch(clearConsumerCurrent())
                );
        } else {
            dispatch(patchConsumer(data))
                .then(() => {
                    dispatch(getConsumers());
                })
                .then(() =>
                    dispatch(clearConsumerCurrent())
                );
        }

    };
    const onReset = async () => {
        await dispatch(clearConsumerCurrent());
        await dispatch(setAlert({type: AlertTypeEnum.SUCCESS, message: IAlertMessage.SUCCESS}));
        await reset();
        await window.location.reload();
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
                <Button type={'button'} onClick={() => onReset()}>Reset</Button>
                {!!activeConsumer.id &&
                    <TextField
                        type={'number'}
                        className={css.input}
                        label={'id'}
                        defaultValue={activeConsumer.id}
                        disabled={true}
                        variant="standard"
                        {...register("id")}
                    />
                }
                <TextField
                    required
                    type={'text'}
                    className={css.input}
                    label="Nick"
                    defaultValue={activeConsumer.nick}
                    variant="standard"
                    {...register("nick", {
                        required: true
                    })}
                />
                <Container className={css.error}>
                    {errors?.nick && `${errors?.nick?.message}`}
                </Container>
                <TextField
                    className={css.input}
                    label="Inn"
                    defaultValue={activeConsumer.profile.inn}
                    variant="standard"
                    {...register("profile.inn", {
                        minLength: {value: 10, message: 'Min 10'},
                        maxLength: {value: 12, message: 'Max 12'}
                    })}
                />
                <Container className={css.error}>
                    {errors?.profile?.inn && `${errors?.profile?.inn?.message}`}
                </Container>
                <TextField
                    className={css.input}
                    label="Name"
                    defaultValue={activeConsumer.profile.name}
                    variant="standard"
                    {...register("profile.name")}
                />
                <Container className={css.error}>
                    {errors?.profile?.name && `${errors?.profile?.name?.message}`}
                </Container>
                <TextField
                    className={css.input}
                    label="Email"
                    defaultValue={activeConsumer.profile.email}
                    variant="standard"
                    {...register("profile.email",
                        {
                            pattern: {
                                value: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g,
                                message: 'Enter valid email'
                            }
                        }
                    )}
                />
                <Container className={css.error}>
                    {errors?.profile?.email && `${errors?.profile?.email?.message}`}
                </Container>
                <TextField
                    className={css.input}
                    label="Telegram"
                    defaultValue={activeConsumer.profile.telegram}
                    variant="standard"
                    {...register("profile.telegram",
                        {
                            pattern: {
                                value: /(?:@|(?:(?:(?:https?:)?t(?:elegram)?).me))(\w{4,})$/g,
                                message: 'Enter valid Telegram link'
                            }
                        }
                    )}
                />
                <Container className={css.error}>
                    {errors?.profile?.telegram && `${errors?.profile?.telegram?.message}`}
                </Container>
                <TextField
                    className={css.input}
                    label="Address of registration"
                    multiline
                    maxRows={20}
                    defaultValue={activeConsumer.profile.addr_register}
                    variant="standard"
                    {...register("profile.addr_register")}
                />
                <Container className={css.error}>
                    {errors?.profile?.addr_register && `${errors?.profile?.addr_register?.message}`}
                </Container>
                <TextField
                    className={css.input}
                    label="Address postal"
                    multiline
                    maxRows={20}
                    defaultValue={activeConsumer.profile.addr_postal}
                    variant="standard"
                    {...register("profile.addr_postal")}
                />
                <Container className={css.error}>
                    {errors?.profile?.addr_postal && `${errors?.profile?.addr_postal?.message}`}
                </Container>
                <Button type={'submit'} disabled={!isValid}>Submit</Button>
            </form>
        </Box>
    );
}
export const ConsumerCreateForm = memo(_ConsumerCreateForm);