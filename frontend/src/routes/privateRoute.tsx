import React, {memo} from 'react';

import {Navigate} from "react-router-dom";

import {useAppSelector} from "../storage";

const _PrivateRoute = ({children}) => {
    const {isAuth} = useAppSelector(state => state.auth);
    return (isAuth && !!JSON.parse(localStorage.getItem('tokenPair')) ? children : <Navigate to={"/login"} replace/>);
};

export const PrivateRoute = memo(_PrivateRoute);
