import {ApiProperty} from "@nestjs/swagger";

export class CreateNomenclatureDto {
    name: string;

    nomenclatureTypeId: number;
}