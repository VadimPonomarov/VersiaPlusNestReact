import React from "react";

import {IConsumer, IOrder} from "../../../../storage/slices/order-slice/interfaces";

export interface IForm {
    prp: {
        form,
        activeOrder?,
        consumers?: IConsumer[],
        handleClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, key: keyof IOrder) => void,
        handleChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: keyof IOrder) => void,
    }
}