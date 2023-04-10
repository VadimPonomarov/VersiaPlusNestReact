export enum AlertTypeEnum {
    SUCCESS = 'Success',
    WARNING = 'Warning',
    ERROR = 'Error',
    INFO = 'Info'
}

export enum IAlertMessage {
    SUCCESS=' 👍 ',
    FAILURE=' 👎 '
}

export interface IAlertInfo {
    type: AlertTypeEnum;
    message: IAlertMessage| string;
}

export interface IInitialState {
    alertInfo: IAlertInfo | null;
    isPending: boolean;
}