import {Body, Controller, Delete, HttpStatus, Param, Patch, Post, Res} from "@nestjs/common";
import {Response} from "express";
import {ResEnum} from "../../../common/constants";
import {ContactEntity, CreateContactDto} from "../dto";
import {ContactService} from "../services/contact/contact.service";
import {ApiExcludeController} from "@nestjs/swagger";

@ApiExcludeController()
@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) {
    }

    @Post('')
    async createContact(@Body('data') data: CreateContactDto,
                        @Res() res: Response) {
        try {
            await this.contactService.createContact(data);
            res.status(HttpStatus.OK)
                .send({message: ResEnum.SUCCESS})
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST)
                .send(e.message);
        }
    }

    @Patch('')
    async updateContact(@Body('data') data: ContactEntity,
                        @Res() res: Response) {
        try {
            await this.contactService.updateContact(data);
            res.status(HttpStatus.OK)
                .send({message: ResEnum.SUCCESS})
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST)
                .send(e.message);
        }
    }

    @Delete(':id')
    async deleteContact(@Param('id') id: string,
                        @Res() res: Response) {
        try {
            await this.contactService.deleteContact(+id)
            res.status(HttpStatus.OK)
                .send({message: ResEnum.SUCCESS})
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST)
                .send(e.message);
        }
    }
}