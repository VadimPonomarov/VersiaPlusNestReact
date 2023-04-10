import React, {FC, memo, ReactNode} from 'react';

import {Navigate} from "react-router-dom";

import {useAppSelector} from "../storage";
import {TokenTypeEnum} from "../storage/slices/auth-slice/interfaces";

const _PrivateRoute = ({children}) => {
    const {isAuth} = useAppSelector(state => state.auth);
    return (isAuth && !!localStorage.getItem(TokenTypeEnum.ACCESS) ? children : <Navigate to={"/login"} replace/>);
};

export const PrivateRoute = memo(_PrivateRoute);
