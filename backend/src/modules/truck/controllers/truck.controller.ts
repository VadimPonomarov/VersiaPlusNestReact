import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus, Patch,
    Res,
    UseGuards,
} from '@nestjs/common';
import {TruckService} from '../services/truck/truck.service';
import {Response} from 'express';
import {ResEnum, RoleEnum} from '../../../common/constants';
import {TruckEntity, TruckNamesListDto} from '../dto';
import {RolesGuard} from '../../auth/guards';
import {Roles} from '../../auth/decorators';
import {ApiExcludeController} from "@nestjs/swagger";

@UseGuards(RolesGuard)
@ApiExcludeController()
@Controller('truck')
export class TruckController {
    constructor(private readonly truckService: TruckService) {
    }

    @Roles(RoleEnum.ADMIN)
    @Get()
    async getAll(@Res() res: Response): Promise<void> {
        try {
            const result = await this.truckService
                .getTruckListEntities()
            res.status(HttpStatus.OK).send({message: ResEnum.SUCCESS, result})
        } catch (e) {
            res.status(HttpStatus.FORBIDDEN).send(e.message)
        }
    }

    @Delete()
    async delete(
        @Body() trucks: TruckNamesListDto[],
        @Res() res: Response,
    ): Promise<void> {
        try {
            await this.truckService
                .deleteMany(trucks);
            res.status(HttpStatus.OK).send(ResEnum.SUCCESS)
        } catch (e) {
            res.status(HttpStatus.NOT_ACCEPTABLE).send(e.message)
        }
    }

    @Get('parse')
    async getParserToggleState(@Res() res: Response): Promise<void> {
        try {
            const result = await this.truckService
                .getParserToggleState();
            res.status(HttpStatus.OK).send({message: ResEnum.SUCCESS, result})
        } catch (e) {
            res.status(HttpStatus.NOT_ACCEPTABLE).send(e.message)
        }
    }

    @Patch('toggle')
    async patchParserToggle(@Res() res: Response): Promise<void> {
        try {
            await this.truckService
                .toggleParsing();
            res.status(HttpStatus.OK).send(ResEnum.SUCCESS)
        } catch (e) {
            res.status(HttpStatus.NOT_ACCEPTABLE).send(e.message)
        }
    }
}
