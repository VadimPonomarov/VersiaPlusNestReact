import {IExecutorTruck} from "../order-slice/interfaces";

export interface ITruck {
    id: number;
    watch: boolean;
    code?: string;
    name: string;
    stop?: string;
    tracing?: string;
    lat?: string;
    lng?: string;
    createdAt: string;
    updatedAt: string;
}

export enum TruckTypeEnum {
    ANY = "ANY",
    СЦЕПКА = "СЦЕПКА",
    ПОЛУПРИЦЕП = "ПОЛУПРИЦЕП",
}

export interface IInitialState {
    trucks: ITruck[];
    checkedAll: boolean;
    checked: number[];
    busy: IExecutorTruck[];
    loading: boolean;
    error: string | null;
    refresh: boolean;
}