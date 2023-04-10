import {ApiProperty} from "@nestjs/swagger";
import {IS_INT, IsEmail, IsInt, Matches} from "class-validator";

export class CreateContactDto {
    label: string

    @Matches('\\+38\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}')
    tel: string;

    @IsEmail()
    email: string;

    info: string;

    @IsInt()
    consumerProfileId: number;

}