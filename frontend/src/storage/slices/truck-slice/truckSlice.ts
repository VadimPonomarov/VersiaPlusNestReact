import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {initialState} from './constants';
import {ITruck, ITruckParserState} from './interfaces';
import {_axiosService} from '../../services';
import {clearPending, setAlert, setPending} from "../common/commonSlice";
import {AlertTypeEnum, IAlertMessage} from "../common/interfaces";
import {IExecutorTruck} from "../order-slice/interfaces";

export const truckList = createAsyncThunk<ITruck[], undefined | null, { rejectValue: string }>(
    "truck/truckList",
    async (_, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.getTruckList();
            if (response.status >= 400) {
                dispatch(clearPending());
                dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE}))
                return rejectWithValue(IAlertMessage.FAILURE);
            }
            dispatch(clearPending());
            dispatch(setTruckList(response.data.result));
            dispatch(setAlert({type: AlertTypeEnum.SUCCESS, message: IAlertMessage.SUCCESS}))
        } catch (e) {
            dispatch(clearPending());
            dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE + e.message}))
        }
    });

export const getTruckParserToggleState = createAsyncThunk<ITruckParserState, undefined | null, { rejectValue: string }>(
    "truck/getTruckParserToggleState",
    async (_, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.getTruckParserToggle();
            if (response.status >= 400) {
                dispatch(clearPending());
                dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE}))
                return rejectWithValue(IAlertMessage.FAILURE);
            }
            dispatch(clearPending());
            dispatch(setAlert({type: AlertTypeEnum.SUCCESS, message: IAlertMessage.SUCCESS}));
            dispatch(setTruckParserToggleState(response.data.result));
        } catch (e) {
            dispatch(clearPending());
            dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE + e.message}))
        }
    });

export const truckParserToggle = createAsyncThunk<unknown, undefined | null, { rejectValue: string }>(
    "truck/truckParserToggle",
    async (_, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.patchTruckParserToggle();
            if (response.status >= 400) {
                dispatch(clearPending());
                dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE}))
                return rejectWithValue(IAlertMessage.FAILURE);
            }
            dispatch(clearPending());
            dispatch(setAlert({type: AlertTypeEnum.SUCCESS, message: IAlertMessage.SUCCESS}))
        } catch (e) {
            dispatch(clearPending());
            dispatch(setAlert({type: AlertTypeEnum.ERROR, message: IAlertMessage.FAILURE + e.message}))
        }
    });

const truckSlice = createSlice({
    name: 'truck',
    initialState,
    reducers: {
        setTruckList(state, action: PayloadAction<ITruck[]>) {
            action.payload.map(truck => {
                const index = state.trucks.indexOf(truck);
                if (index) {
                    return state.trucks[index] = truck;
                } else {
                    return state.trucks.push(truck);
                }
            });
            state.trucks = action.payload;
        },

        setChecked(state, action: PayloadAction<number[]>) {
            const _checked = state.checked;
            for (let i of action.payload) {
                const index = _checked.includes(i);
                if (!index) _checked.push(i);
            }
            state.checked = _checked;
        },

        setOneToBusyList(state, action: PayloadAction<IExecutorTruck>) {
            const isExist = state.busy.find(item => item.name = action.payload.name);
            if (!isExist) state.busy = [...state.busy, action.payload];
        },

        toggleCheckedAll(state) {
            state.checkedAll = !state.checkedAll;
        },

        deleteChecked(state, action: PayloadAction<number[]>) {
            state.checked = state.checked.filter(item => !action.payload.includes(item));
        },

        deleteOneFromBusyList(state, action: PayloadAction<IExecutorTruck>) {
            state.busy = state.busy.filter(item => item.name !== action.payload.name);
        },

        toggleRefresh(state) {
            state.refresh = !state.refresh;
        },
        setTruckParserToggleState(state, action: PayloadAction<ITruckParserState>) {
            state.truckParserState = {...action.payload};
        }
    },

})

export const {
    setTruckList,
    toggleRefresh,
    setChecked,
    deleteChecked,
    toggleCheckedAll,
    deleteOneFromBusyList,
    setOneToBusyList,
    setTruckParserToggleState
} = truckSlice.actions;
export default truckSlice.reducer;
