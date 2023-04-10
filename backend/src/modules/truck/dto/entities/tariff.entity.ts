import {IsNumber} from "class-validator";

export class TariffEntity {
    @IsNumber()
    from: number

    @IsNumber()
    upto: number

    @IsNumber()
    tariff: number

    @IsNumber()
    value: number
}