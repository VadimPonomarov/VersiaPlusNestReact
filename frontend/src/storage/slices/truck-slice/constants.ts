import {IInitialState} from "./interfaces";

export const initialState: IInitialState = {
    trucks: [],
    checkedAll: false,
    checked: [],
    busy: [],
    loading: false,
    error: null,
    refresh: false
}
