import axios from "axios";

import {ILoginInputs, IRegistrationInputs} from "../../interfaces";
import {TokenTypeEnum} from "../slices/auth-slice/interfaces";
import {IConsumer, IContact} from "../slices/order-slice/interfaces";

const _baseUrl = process.env.REACT_APP_AXIOS_BASE_URL as string;
const _axios = axios.create({
    baseURL: _baseUrl,
    withCredentials: false,
});

export const _accessToken = () => {
    return JSON.parse(localStorage.getItem('tokenPair')) ?
        JSON.parse(localStorage.getItem('tokenPair'))[0]['token'] :
        ''
}
export const _refreshToken = () => {
    return JSON.parse(localStorage.getItem('tokenPair')) ?
        JSON.parse(localStorage.getItem('tokenPair'))[1]['token'] :
        ''
}

_axios.interceptors.request.use((config) => {
    try {
        config.headers.Authorization = "Bearer " + _accessToken();
        return config;
    } catch (e) {
    }
}, (error) => {
    return Promise.reject(error);
});

_axios.interceptors.response.use((config) => {
    return config;
}, (error) => {
    if (error.response.status !== 403) throw new Error(error);
    const originalReq = error.config;
    try {
        _axiosService.getRefreshToken()
            .then(res => localStorage.setItem('tokenPair', JSON.stringify(res.data.result)))
        return _axios.request(originalReq);
    } catch (e) {
        alert(e.message)
    }
});


export const _axiosService = {
    postLogin: (body: ILoginInputs) => _axios.post('/auth/login', body),
    postRegistration: (body: IRegistrationInputs) => _axios.post('/auth/registration', body),
    getTruckList: () => _axios.get('/truck'),
    patchTruckParserToggle: () => _axios.patch('/truck/toggle'),
    getTruckParserToggle: () => _axios.get('/truck/parse'),
    getRefreshToken: () => _axios.post('/auth/refresh', {refreshToken: _refreshToken()}),
    getTariffs: () => _axios.get('/tariff'),
    patchTariffs: (data) => _axios.patch('/tariff', {data}),
    getConsumers: () => _axios.get('/consumer'),
    getConsumer: (id: number) => _axios.get(`/consumer/${id}`),
    postConsumer: (data: IConsumer) => _axios.post(`/consumer`, {data}),
    patchConsumer: (id: number, data: IConsumer) => _axios.patch(`/consumer/${id}`, {data}, {method: "patch"}),
    deleteConsumer: (id: number) => _axios.delete(`/consumer/${id}`),
    postContact: (data: IContact) => _axios.post(`/contact`, {data}),
    patchContact: (data: IContact) => _axios.patch(`/contact`, {data}),
    deleteContact: (id: string) => _axios.delete(`/contact/${id}`),
}

