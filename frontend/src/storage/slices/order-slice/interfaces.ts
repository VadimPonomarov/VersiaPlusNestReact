import {IDirection} from "../directions-slice/interfaces";
import {ITruck, TruckTypeEnum} from "../truck-slice/interfaces";

export enum StatusOrderEnum {
    CREATED = 'CREATED',
    ACTIVE = 'ACTIVE',
    MODIFIED = 'MODIFIED',
    PROCESSED = 'PROCESSED',
    CLOSED = 'CLOSED',
    ARCHIVED = 'ARCHIVED'
}

export enum StatusOrder_TruckEnum {
    ACTIVE = 'ACTIVE',
    PROCESSED = 'PROCESSED',
    CLOSED = 'CLOSED',
    ARCHIVED = 'ARCHIVED'
}

export enum NomenclatureTypeEnum {
    AGRICULTURAL = "AGRICULTURAL",
    INDUSTRIAL = "INDUSTRIAL"
}

export interface IExecutorTruck {
    code: string;
    name: string;
}

export interface IOrder {
    id: string;
    status: StatusOrderEnum | '';
    consumer: string;
    dateCreation: string;
    dateLoading: string;
    nomenclatureType: NomenclatureTypeEnum[] | [];
    nomenclature: string[];
    routeId: string;
    route: IDirection;
    distance: number | null;
    tariff: ITariff | null;
    truckType: TruckTypeEnum[] | '';
    truckNumber: number;
    extraInfo: string;
    file: File;
    executors: IExecutorTruck[];
}

export interface IOrderStatistics {

}

export interface IOrder_Truck {
    status: StatusOrder_TruckEnum;
    statistics: IOrderStatistics;
    orderId: string;
    truckId: string;
}

export interface ITariff {
    id: number;
    from: number;
    upto: number;
    tariff: number;
    value: number;
}

export interface IContact {
    id: number;
    label: string;
    tel: string;
    email: string;
    viber: string;
    telegram: string;
    info: string;
    consumerProfileId: number;
    createdAt: string;
    updatedAt: string;
}

export interface IConsumerProfile {
    id: number;
    inn: string;
    name: string,
    email: string,
    telegram: string,
    addr_register: string,
    addr_postal: string,
    createdAt: string,
    updatedAt: string,
    contacts: IContact[]
}

export interface IConsumer {
    id: number;
    nick: string;
    consumerProfileId: number;
    createdAt: string;
    updatedAt: string;
    profile: IConsumerProfile;

}

export interface IInitialState {
    orders: IOrder[];
    activeOrder: IOrder;
    activeConsumer: IConsumer,
    activeContact: IContact,
    processed: IOrder_Truck[];
    closed: IOrder_Truck[];
    archived: IOrder_Truck[];
    selected: IOrder_Truck[];
    tariffs: ITariff[];
    consumers: IConsumer[];
}