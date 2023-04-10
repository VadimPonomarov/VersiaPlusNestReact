import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res} from "@nestjs/common";
import {Response} from "express";
import {ResEnum} from "../../../common/constants";
import {NomenclatureService} from "../services/nomenclature/nomenclature.service";
import {NomenclatureTypeService} from "../services/nomenclature/nomenclatureType.service";
import {CreateNomenclatureDto, CreateNomenclatureTypeDto} from "../dto";
import {ApiExcludeController} from "@nestjs/swagger";

@ApiExcludeController()
@Controller('nomenclature')
export class NomenclatureController {
    constructor(private readonly nomenclatureService: NomenclatureService,
                private readonly nomenclatureTypeService: NomenclatureTypeService,
    ) {
    }

    @Get('')
    async getAll(@Res() res: Response) {
        try {
            const result = await this.nomenclatureService.getAll();
            await res
                .status(HttpStatus.OK)
                .send({message: ResEnum.SUCCESS, result});
        } catch (e) {
            await res
                .status(HttpStatus.BAD_REQUEST)
                .send({message: ResEnum.FAILURE});
        }
    }

    @Get('/type')
    async getAllTypes(@Res() res: Response) {
        try {
            const result = await this.nomenclatureTypeService.getAll();
            await res
                .status(HttpStatus.OK)
                .send({message: ResEnum.SUCCESS, result});
        } catch (e) {
            await res
                .status(HttpStatus.BAD_REQUEST)
                .send({message: ResEnum.FAILURE});
        }
    }

    @Get('/:id')
    async getOne(@Param('id') id: string, @Res() res: Response) {
        try {
            const result = await this.nomenclatureService.getOne(+id);
            await res
                .status(HttpStatus.OK)
                .send({message: ResEnum.SUCCESS, result});
        } catch (e) {
            await res
                .status(HttpStatus.BAD_REQUEST)
                .send({message: ResEnum.FAILURE});
        }
    }

    @Post('')
    async create(@Body() body: CreateNomenclatureDto, @Res() res: Response) {
        try {
            const result = await this.nomenclatureService.create(body);
            await res.status(HttpStatus.OK)
                .send({message: ResEnum.SUCCESS});
        } catch (e) {
            await res
                .status(HttpStatus.BAD_REQUEST)
                .send({message: ResEnum.FAILURE});
        }
    }

    @Post('/type')
    async createType(@Body() body: CreateNomenclatureTypeDto, @Res() res: Response) {
        try {
            const result = await this.nomenclatureTypeService.create(body);
            await res.status(HttpStatus.OK)
                .send({message: ResEnum.SUCCESS});
        } catch (e) {
            await res
                .status(HttpStatus.BAD_REQUEST)
                .send({message: ResEnum.FAILURE});
        }
    }

    @Patch('/:id')
    async update(@Param('id') id: string, @Body() body, @Res() res: Response) {
        try {
            const result = await this.nomenclatureService.update(+id, body);
            await res.status(HttpStatus.OK)
                .send({message: ResEnum.SUCCESS})
        } catch (e) {
            await res
                .status(HttpStatus.BAD_REQUEST)
                .send({message: ResEnum.FAILURE});
        }
    }

    @Patch('/type/:id')
    async updateType(@Param('id') id: string, @Body() body, @Res() res: Response) {
        try {
            const result = await this.nomenclatureTypeService.update(+id, body);
            await res.status(HttpStatus.OK)
                .send({message: ResEnum.SUCCESS})
        } catch (e) {
            await res
                .status(HttpStatus.BAD_REQUEST)
                .send({message: ResEnum.FAILURE});
        }
    }

    @Delete('/:id')
    async deleteOne(@Param('id') id: string, @Res() res: Response) {
        try {
            await this.nomenclatureService.deleteOne(+id);
            await res.status(HttpStatus.OK)
                .send({message: ResEnum.SUCCESS})
        } catch (e) {
            await res
                .status(HttpStatus.BAD_REQUEST)
                .send({message: ResEnum.FAILURE});
        }
    }

    @Delete('/type/:id')
    async deleteOneType(@Param('id') id: string, @Res() res: Response) {
        try {
            await this.nomenclatureTypeService.deleteOne(+id);
            await res.status(HttpStatus.OK)
                .send({message: ResEnum.SUCCESS})
        } catch (e) {
            await res
                .status(HttpStatus.BAD_REQUEST)
                .send({message: ResEnum.FAILURE});
        }
    }
}