import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {initialState} from "./constants";
import {IMap, IMapCoordinates} from './interfaces';


const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setMapCoordinates(state, action: PayloadAction<IMapCoordinates>) {
            state.mapCoordinates = action.payload;
        },
        setMapRef(state, action: PayloadAction<IMap>) {
            state.mapRef = action.payload;
        }
    }
});

export const {setMapCoordinates, setMapRef} = mapSlice.actions;
export default mapSlice.reducer;