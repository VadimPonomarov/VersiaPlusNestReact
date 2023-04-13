import {IInitialState, ITruckParserState} from "./interfaces";
export const ITruckParserInitialState: ITruckParserState = {
    id: null,
    parser: false
}

export const initialState: IInitialState = {
    trucks: [],
    checkedAll: false,
    checked: [],
    busy: [],
    loading: false,
    error: null,
    refresh: false,
    truckParserState: ITruckParserInitialState
}
