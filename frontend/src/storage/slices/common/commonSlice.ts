import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {initialState} from "./constants";
import {IAlertInfo} from "./interfaces";

const mapSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setAlert(state, action: PayloadAction<IAlertInfo>) {
            state.alertInfo = action.payload;
        },
        clearAlert(state, action: PayloadAction<undefined | null>) {
            state.alertInfo = null;
        },
        setPending(state) {
            state.isPending = true;
        },
        clearPending(state) {
            state.isPending = false;
        }
    }
});

export const {setAlert, clearAlert, setPending, clearPending} = mapSlice.actions;
export default mapSlice.reducer;