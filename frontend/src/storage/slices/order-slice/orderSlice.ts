import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {initialContact, initialConsumer, initialState, initialActiveOrder} from "./constants";
import {IConsumer, IContact, IExecutorTruck, IOrder, ITariff} from "./interfaces";
import {_axiosService} from "../../services";
import {clearPending, setAlert, setPending} from "../common/commonSlice";
import {AlertTypeEnum, IAlertMessage} from "../common/interfaces";

const dispatch = createAsyncThunk<void, { type: AlertTypeEnum, message: IAlertMessage }>(
    "order/dispatch",
    async (data, {dispatch}) => {
        dispatch(setAlert(data));
    });
export const getTariffs = createAsyncThunk<{ message: string, result: ITariff[] }, undefined, { rejectValue: string }>(
    "order/getTariffs",
    async (_, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.getTariffs();
            if (response.status >= 400) {
                dispatch(clearPending());
                dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE}))
                return rejectWithValue(IAlertMessage.FAILURE);
            }
            dispatch(clearPending());
            dispatch(setTariffs(response.data.result));
        } catch (e) {
            dispatch(clearPending());
            dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE + e.message}))
        }
    });

export const patchTariffs = createAsyncThunk<undefined, ITariff[], { rejectValue: string }>(
    "order/patchTariffs",
    async (data, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.patchTariffs(data);
            if (response.status >= 400) {
                dispatch(clearPending());
                dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE}));
                return rejectWithValue(IAlertMessage.FAILURE);
            }
            dispatch(clearPending());
        } catch (e) {
            dispatch(clearPending());
            dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE + e.message}))
        }
    });

export const getConsumers = createAsyncThunk<IConsumer[], undefined, { rejectValue: string }>(
    "order/getConsumers",
    async (_, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.getConsumers();
            if (response.status >= 400) {
                dispatch(clearPending());
                dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE}));
                return rejectWithValue(IAlertMessage.FAILURE);
            }
            dispatch(setConsumerList(response.data.result))
            dispatch(clearPending());
        } catch (e) {
            dispatch(clearPending());
            dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE + e.message}))
        }
    });

export const postConsumer = createAsyncThunk<undefined, IConsumer, { rejectValue: string }>(
    "order/postConsumer",
    async (data, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.postConsumer(data);
            if (response.status >= 400) {
                dispatch(clearPending());
                dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE}));
                return rejectWithValue(IAlertMessage.FAILURE);
            }
            dispatch(clearPending());
        } catch (e) {
            dispatch(clearPending());
            dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE + e.message}))
        }
    });

export const patchConsumer = createAsyncThunk<undefined, IConsumer, { rejectValue: string }>(
    "order/patchConsumer",
    async (data, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.patchConsumer(+data.id, data);
            if (response.status >= 400) {
                dispatch(clearPending());
                dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE}));
                return rejectWithValue(IAlertMessage.FAILURE);
            }
            dispatch(clearPending());
        } catch (e) {
            dispatch(clearPending());
            dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE + e.message}))
        }
    });

export const deleteConsumer = createAsyncThunk<undefined, number, { rejectValue: string }>(
    "order/postConsumer",
    async (id, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.deleteConsumer(id);
            if (response.status >= 400) {
                dispatch(clearPending());
                dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE}));
                return rejectWithValue(IAlertMessage.FAILURE);
            }
            dispatch(clearPending());
        } catch (e) {
            dispatch(clearPending());
            dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE + e.message}))
        }
    });

export const postContact = createAsyncThunk<undefined, IContact, { rejectValue: string }>(
    "order/postContact",
    async (data, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.postContact(data);
            if (response.status >= 400) {
                dispatch(clearPending());
                dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE}));
                return rejectWithValue(IAlertMessage.FAILURE);
            }
            dispatch(clearPending());
        } catch (e) {
            dispatch(clearPending());
            dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE + e.message}))
        }
    });
export const patchContact = createAsyncThunk<undefined, IContact, { rejectValue: string }>(
    "order/postContact",
    async (data, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.patchContact(data);
            if (response.status >= 400) {
                dispatch(clearPending());
                dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE}));
                return rejectWithValue(IAlertMessage.FAILURE);
            }
            dispatch(clearPending());
        } catch (e) {
            dispatch(clearPending());
            dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE + e.message}))
        }
    });
export const deleteContact = createAsyncThunk<undefined, string | number, { rejectValue: string }>(
    "order/deleteContact",
    async (id, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.deleteContact(id.toString());
            if (response.status >= 400) {
                dispatch(clearPending());
                dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE}));
                return rejectWithValue(IAlertMessage.FAILURE);
            }
            dispatch(clearPending());
        } catch (e) {
            dispatch(clearPending());
            dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE + e.message}))
        }
    });

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setTariffs(state, action: PayloadAction<ITariff[]>) {
            state.tariffs = action.payload.sort((a, b) => a.from - b.from);
        },
        updateOneLocal(state, action: PayloadAction<ITariff>) {
            if (!state.tariffs.length) return;
            const isFound = state.tariffs.find(item => item.id === action.payload.id);
            if (isFound) {
                const index = state.tariffs.indexOf(isFound);
                state.tariffs[index] = {
                    ...state.tariffs[index],
                    tariff: +action.payload.tariff,
                    value: +action.payload.value
                };
            }
        },
        setConsumerList(state, action: PayloadAction<IConsumer[]>) {
            state.consumers = action.payload.map(item => (
                {...item, activeContact: null}
            ));
        },
        setConsumerCurrent(state, action: PayloadAction<IConsumer>) {
            state.activeConsumer = action.payload;
        },
        setConsumerCurrentById(state, action: PayloadAction<number>) {
            const candidate = state.consumers.find(item => item.id === action.payload);
            if (candidate) {
                state.activeConsumer = candidate;
            }
        },
        clearConsumerCurrent(state) {
            state.activeConsumer = initialConsumer;
        },
        setConsumerCurrentContact(state, action: PayloadAction<IContact>) {
            const isExist = state.activeConsumer.profile.contacts.find(item =>
                item.label.toLowerCase().trim() === action.payload.label.toLowerCase().trim()
            );
            if (!!isExist) {
                const index = state.activeConsumer.profile.contacts.indexOf(isExist);
                state.activeConsumer.profile.contacts[index] = state.activeContact;
                state.activeContact = action.payload;
            } else {
                state.activeConsumer.profile.contacts.push(state.activeContact);
                state.activeContact = action.payload;
            }
        },
        setCurrentContactById(state, action: PayloadAction<number>) {
            try {
                const _activeContact =
                    state.activeConsumer.profile.contacts
                        .find(item => +item.id === +action.payload);
                if (_activeContact) state.activeContact = {..._activeContact};
            } catch (e) {
            }
        },
        clearConsumerCurrentContact(state) {
            state.activeContact = null;
            state.activeContact = initialContact;
        },
        setOrderCurrent(state, action: PayloadAction<IOrder>) {
            state.activeOrder = action.payload
        },
        alterOrderCurrent(state, action: PayloadAction<Partial<IOrder>>) {
            state.activeOrder = {...state.activeOrder, ...action.payload}
        },
        setOrderCurrentById(state, action: PayloadAction<string>) {
            const isExist = state.orders.find(item => item.id === action.payload);
            isExist ? state.activeOrder = isExist : state.activeOrder = initialActiveOrder;
        },
        setOrderCurrentInitial(state) {
            state.activeOrder = {...initialActiveOrder};
        },
        setOrderList(state, action: PayloadAction<IOrder>) {
            const isExist = state.orders.find(item => item.id === action.payload.id);
            if (!!isExist) {
                const index = state.orders.indexOf(isExist)
                state.orders[index] = {...state.activeOrder}
            } else {
                state.orders = [...state.orders, {...state.activeOrder}]
            }
        },
        setOnSubmit(state, action: PayloadAction<IOrder>) {
            const isExist = state.orders.find(item => item.id === action.payload.id);
            if (isExist) {
                const index = state.orders.indexOf(isExist);
                state.orders[index] = action.payload;
            } else {
                state.orders.push(action.payload);
            }
            setOrderCurrent(action.payload)
        },
        setExecutorTruck(state, action: PayloadAction<IExecutorTruck>) {
            const isExist =
                state.activeOrder.executors.find(item =>
                    item.name === action.payload.name);
            if (!!isExist) return;
            state.activeOrder.executors = [...state.activeOrder.executors, action.payload];
        },
        deleteExecutorTruck(state, action: PayloadAction<{ orderId: string, truck: IExecutorTruck }>) {
            setOrderCurrentById(action.payload.orderId);
            state.activeOrder.executors = state.activeOrder.executors.filter(item => item.name !== action.payload.truck.name);
            state.activeOrder = {...state.activeOrder};
        },
    },
});

export const {
    setTariffs,
    updateOneLocal,
    setConsumerCurrentContact,
    setConsumerCurrent,
    clearConsumerCurrent,
    setConsumerList,
    setConsumerCurrentById,
    clearConsumerCurrentContact,
    setCurrentContactById,
    setOrderCurrent,
    setOrderList,
    setOrderCurrentById,
    setOrderCurrentInitial,
    alterOrderCurrent,
    setOnSubmit,
    setExecutorTruck,
    deleteExecutorTruck,
} = orderSlice.actions;
export default orderSlice.reducer;