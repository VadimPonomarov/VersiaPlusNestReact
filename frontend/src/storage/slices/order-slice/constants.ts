import {IConsumer, IConsumerProfile, IContact, IInitialState, IOrder, NomenclatureTypeEnum} from "./interfaces";
import {initialDirectionCurrent} from "../directions-slice/constants";

export const initialContact: IContact = {
    id: null,
    label: '',
    email: '',
    tel: '',
    viber: '',
    telegram: '',
    info: '',
    updatedAt: '',
    createdAt: '',
    consumerProfileId: null
}

export const initialProfile: IConsumerProfile = {
    id: null,
    inn: '',
    name: '',
    email: '',
    telegram: '',
    addr_postal: '',
    addr_register: '',
    createdAt: '',
    updatedAt: '',
    contacts: [],
}

export const initialConsumer: IConsumer = {
    id: null,
    nick: '',
    profile: initialProfile,
    consumerProfileId: null,
    updatedAt: '',
    createdAt: ''
}

export const initialActiveOrder: IOrder = {
    id: undefined,
    status: '',
    consumer: '',
    dateCreation: undefined,
    dateLoading: undefined,
    nomenclatureType: [],
    nomenclature: [],
    routeId: '',
    route: initialDirectionCurrent,
    tariff: null,
    distance: null,
    truckType: '',
    truckNumber: null,
    extraInfo: '',
    file: undefined,
    executors: []
}

export const initialState: IInitialState = {
    orders: [],
    activeOrder: initialActiveOrder,
    activeConsumer: initialConsumer,
    activeContact: initialContact,
    closed: [],
    processed: [],
    archived: [],
    selected: [],
    tariffs: [],
    consumers: [],
};