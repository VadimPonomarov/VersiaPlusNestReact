import {IsEmail, Matches} from "class-validator";

export class ContactEntity {
    id: number;
    label: string
    @Matches('\\+38\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}')
    tel: string;
    @IsEmail()
    email: string;
    @Matches(/\\+38\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}/g)
    viber: string;
    @Matches(/(?:@|(?:(?:(?:https?:)?t(?:elegram)?).me))(\\w{4,})$/g)
    telegram: string;
    info: string;
    createdAt: Date;
    updatedAt: Date;
}