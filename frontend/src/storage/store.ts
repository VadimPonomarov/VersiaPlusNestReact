import {
    Action,
    combineReducers,
    configureStore,
    ThunkAction,
} from '@reduxjs/toolkit';
import {persistReducer, createTransform} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';

import authSlice from "./slices/auth-slice/authSlice";
import commonSlice from "./slices/common/commonSlice";
import directionsSlice from './slices/directions-slice/directionsSlice';
import drawerSlice from './slices/drawer-slice/drawerSlice';
import mapSlice from './slices/map-slice/mapSlice';
import markersSlice from './slices/marker-slice/markersSlice';
import orderSlice from "./slices/order-slice/orderSlice";
import truckSlice from "./slices/truck-slice/truckSlice";

const rootReducer = combineReducers({
    directions: directionsSlice,
    drawer: drawerSlice,
    markers: markersSlice,
    map: mapSlice,
    auth: authSlice,
    truck: truckSlice,
    order: orderSlice,
    common: commonSlice
});
const transformCircular = createTransform(
    (inboundState, key) => JSON.stringify(inboundState),
    (outboundState, key) => JSON.parse(outboundState)
)

const persistConfig = {
    key: 'root',
    storage,
    /*transforms: [transformCircular],*/
    //whitelist:['authSlice']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 300 },
        serializableCheck: false,
    }),
    devTools: process.env.NODE_ENV !== 'production',

});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
