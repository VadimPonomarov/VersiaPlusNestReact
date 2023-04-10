export interface IInitialState {
    isAuth: boolean;
    loading: boolean;
    error: string | null;
}

export interface IToken {
    type: TokenTypeEnum;
    token: string
}

export enum TokenTypeEnum {
    'ACCESS' = 'ACCESS',
    'REFRESH' = 'REFRESH'
}