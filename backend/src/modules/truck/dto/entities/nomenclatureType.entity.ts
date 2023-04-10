import {ApiProperty} from "@nestjs/swagger";

export class NomenclatureTypeEntity {
    @ApiProperty({
        type: Number,
        uniqueItems: true,
        description: 'Type`s identifier',
        nullable: false,
        readOnly: true,
    })
    id: number;

    @ApiProperty({
        type: String,
        required: true,
        uniqueItems: true,
        description: 'Unique type name'
    })
    name: string;

    @ApiProperty({
        type: Date,
        readOnly: true,
        description: 'Type`s date of creation',
    })
    createdAt: Date;

    @ApiProperty({
        type: Date,
        readOnly: true,
        description: 'Data of the last update of type',
    })
    updatedAt: Date;
}