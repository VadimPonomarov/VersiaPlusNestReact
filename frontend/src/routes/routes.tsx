import React, {FC, memo} from 'react';

import {Route, Routes} from "react-router-dom";

import { PrivateRoute } from '.';
import {
    ConsumerCreateForm, ConsumerList,
    ContactCreateForm,
    Login,
    Logout,
    MyGoogleMaps,
    Nomenclature,
    OrderList,
    OrderTab,
    Tariffs
} from '../components';
import {Registration} from "../components/auth/registration/registration";
import {ContactList} from "../components/contacts/contactList";
import {MainLayout} from "../layouts";
import {ConsumersLayout} from "../layouts/consumers/consumers-layout";

const _RoutesMain: FC = () => {

    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<PrivateRoute><MyGoogleMaps/></PrivateRoute>}/>
                <Route path={'order'} element={<PrivateRoute><OrderTab/></PrivateRoute>}/>
                <Route path={'order/:id'} element={<PrivateRoute><OrderTab/></PrivateRoute>}/>
                <Route path={'order-list'} element={<PrivateRoute><OrderList/></PrivateRoute>}/>
                <Route path={'consumers'} element={<PrivateRoute><ConsumersLayout/></PrivateRoute>}>
                    <Route index element={<PrivateRoute><ConsumerList/></PrivateRoute>}/>
                    <Route path={'form'} element={<PrivateRoute><ConsumerCreateForm/></PrivateRoute>}/>
                    <Route path={'contacts'} element={<PrivateRoute><ContactList/></PrivateRoute>}/>
                    <Route path={'contacts/contact/form'} element={<PrivateRoute><ContactCreateForm/></PrivateRoute>}/>
                </Route>
                <Route path={'nomenclature'} element={<PrivateRoute><Nomenclature/></PrivateRoute>}/>
                <Route path={'tariffs'} element={<PrivateRoute><Tariffs/></PrivateRoute>}/>
                <Route path={'registration'} element={<Registration/>}/>
                <Route path={'login'} element={<Login/>}/>
                <Route path={'logout'} element={<Logout/>}/>
            </Route>
        </Routes>

    );
};

export const RoutesMain = memo(_RoutesMain);