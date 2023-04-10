import {Body, Controller, Delete, Get, HttpStatus, Patch, Post, Res} from "@nestjs/common";
import {ApiExcludeController, ApiTags} from "@nestjs/swagger";
import {ResEnum} from "../../../common/constants";
import {Response} from "express";
import {CreateTariffDto} from "../dto";
import {TariffService} from "../services/tariff/tariff.service";

@ApiTags('Tariffs')
@ApiExcludeController()
@Controller('tariff')
export class TariffController {
    constructor(private readonly tariffService: TariffService,
    ) {
    }

    @Get()
    async getAll(@Res() res: Response) {
        try {
            const result = await this.tariffService.getAll();
            await res
                .status(HttpStatus.OK)
                .send({message: ResEnum.SUCCESS, result});
        } catch (e) {
            await res
                .status(HttpStatus.BAD_REQUEST)
                .send(e.message);
        }
    }

    @Patch()
    async updateMany(@Body('data') body: CreateTariffDto[],
                     @Res() res: Response) {
        try {
            const result = await this.tariffService.updateMany(body);
            await res.status(HttpStatus.OK)
                .send({message: ResEnum.SUCCESS})
        } catch (e) {
            await res
                .status(HttpStatus.BAD_REQUEST)
                .send(e.message);
        }
    }

    @Delete()
    async deleteMany(@Body() ids: number[],
                     @Res() res: Response) {
        try {
            await this.tariffService.deleteMany(ids);
            await res.status(HttpStatus.OK)
                .send({message: ResEnum.SUCCESS})
        } catch (e) {
            await res
                .status(HttpStatus.BAD_REQUEST)
                .send(e.message);
        }
    }

}