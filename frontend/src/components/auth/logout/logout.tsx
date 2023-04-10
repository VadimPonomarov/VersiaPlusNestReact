import React, {memo} from 'react';

import {useNavigate} from "react-router-dom";
import {useEffectOnce} from "usehooks-ts";

import {clearToken, setIsAuth, useAppDispatch} from "../../../storage";

const _Logout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    useEffectOnce(() => {
        dispatch( clearToken());
        dispatch( setIsAuth(false));
        navigate('/login');
    })
    return (
        <div>
            <h1>Logout</h1>
        </div>
    );
};

export const Logout = memo(_Logout);