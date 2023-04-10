import {ApiProperty} from "@nestjs/swagger";
import {IsNumber} from "class-validator";
import {Decimal} from "@prisma/client/runtime";

export class CreateTariffDto {
    id: number;

    @IsNumber()
    from: number

    @IsNumber()
    upto: number

    @IsNumber()
    tariff: number

    @IsNumber()
    value: number
}