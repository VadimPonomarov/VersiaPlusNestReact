import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {initialState} from "./constants";
import {IToken, TokenTypeEnum} from "./interfaces";
import {ILoginInputs, IRegistrationInputs} from "../../../interfaces";
import {_axiosService} from '../../services'
import {clearPending, setAlert, setPending} from "../common/commonSlice";
import {AlertTypeEnum} from "../common/interfaces";

export const login = createAsyncThunk<IToken, ILoginInputs, { rejectValue: string }>(
    "auth/login",
    async (body, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.postLogin(body);
            if (response.status >= 400) {
                dispatch(clearPending());
                dispatch(setAlert({type: AlertTypeEnum.ERROR, message: 'Error 👎'}))
                return rejectWithValue('Error 👎');
            }
            dispatch(clearPending());
            dispatch(setToken(response.data.result));
        } catch (e) {
            dispatch(clearPending());
            dispatch(setAlert({type: AlertTypeEnum.ERROR, message: e.message}))
        }
    });
export const registration = createAsyncThunk<undefined, IRegistrationInputs, { rejectValue: string }>(
    "auth/registration",
    async (body, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setPending());
            const response = await _axiosService.postRegistration(body);
            if (response.status >= 400) {
                dispatch(clearPending());
                dispatch(setAlert({type: AlertTypeEnum.ERROR, message: 'Error 👎'}))
                return rejectWithValue('Error 👎');
            }
            dispatch(setAlert({type: AlertTypeEnum.SUCCESS, message: response.data}))
            dispatch(clearPending());
        } catch (e) {
            dispatch(clearPending());
            dispatch(setAlert({type: AlertTypeEnum.ERROR, message: e.message}))
        }
    });

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearToken(state) {
            localStorage.removeItem(TokenTypeEnum.ACCESS);
        },
        toggleIsAuth(state) {
            state.isAuth = !state.isAuth;
        },
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
        setToken(state, action: PayloadAction<IToken[]>) {
            localStorage.setItem('tokenPair', JSON.stringify(action.payload));
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isAuth = false;
            })
            .addCase(login.fulfilled, (state) => {
                state.isAuth = true;
            })
            .addCase(login.rejected, (state) => {
                state.isAuth = false;
            })
    },
})


export const {clearToken, toggleIsAuth, setIsAuth, setToken} = authSlice.actions;
export default authSlice.reducer;
