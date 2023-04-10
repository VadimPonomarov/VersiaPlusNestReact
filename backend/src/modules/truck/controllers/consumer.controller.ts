import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res} from '@nestjs/common';
import {ConsumerService} from "../services/consumer/consumer.service";
import {CreateConsumerDto} from "../dto";
import {Response} from "express";
import {ResEnum} from "../../../common/constants";
import {ApiExcludeController} from "@nestjs/swagger";

@ApiExcludeController()
@Controller('consumer')
export class ConsumerController {
    constructor(private readonly consumerService: ConsumerService) {
    }

    @Get('')
    async getAll(@Res() res: Response): Promise<void> {
        try {
            const result = await this.consumerService.getAll();
            res.status(HttpStatus.OK).send({message: ResEnum.SUCCESS, result});
        } catch (e) {
            res.status(HttpStatus.NOT_ACCEPTABLE).send(e.message);
        }
    }

    @Get(':id')
    async getOneById(@Param('id') id: string, @Res() res: Response): Promise<void> {
        try {
            const result = await this.consumerService.getOneById(+id);
            res.status(HttpStatus.OK).send({message: ResEnum.SUCCESS, result});
        } catch (e) {
            res.status(HttpStatus.NOT_ACCEPTABLE).send(e.message);
        }
    }

    @Post('')
    async create(@Body('data') data: CreateConsumerDto, @Res() res: Response): Promise<void> {
        try {
            res.status(HttpStatus.OK);
            await this.consumerService.createConsumer(data);
            res.status(HttpStatus.OK).send({message: ResEnum.SUCCESS})
        } catch (e) {
            res.status(HttpStatus.NOT_ACCEPTABLE).send(e.message)
        }
    }

    @Patch(':id')
    async update(@Param('id') id: string,
                 @Body('data') data: CreateConsumerDto, @Res() res: Response): Promise<void> {
        try {
            await this.consumerService.updateConsumer(+id, data);
            res.status(HttpStatus.OK).send({message: ResEnum.SUCCESS})
        } catch (e) {
            res.status(HttpStatus.NOT_ACCEPTABLE).send(e.message)
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Res() res: Response): Promise<void> {
        try {
            await this.consumerService.deleteConsumer(+id);
            res.status(HttpStatus.OK).send({message: ResEnum.SUCCESS})
        } catch (e) {
            res.status(HttpStatus.NOT_ACCEPTABLE).send(e.message)
        }
    }
}
