import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../../../core/prisma.service";
import {ContactEntity, CreateContactDto} from "../../dto";
import {ResEnum} from "../../../../common/constants";

@Injectable()
export class ContactService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async createContact(data: CreateContactDto): Promise<void> {
        try {
            const isExist =
                await this.prismaService.contact.findFirst({where: {label: data.label}});
            if (isExist)
                throw new Error(ResEnum.FAILURE + `Contact with the same label: ${data.label} already exist`)
            await this.prismaService.contact.create({data:{...data, id:undefined}});
        } catch (e) {
            console.log('createContact', e.message)
            throw new Error(e)
        }
    }

    async updateContact(data: ContactEntity): Promise<void> {
        try {
            const isExist =
                await this.prismaService.contact.findFirst({where: {id: data.id}});
            if (!isExist)
                throw new Error(ResEnum.FAILURE + `There is no contact with id: ${data.id}`)
            await this.prismaService.contact.update({where: {id: data.id}, data});
        } catch (e) {
            console.log('updateContact', e.message)
            throw new Error(e)
        }
    }

    async deleteContact(id: number): Promise<void> {
        try {
            const isExist =
                await this.prismaService.contact.findFirst({where: {id}});
            if (!isExist)
                throw new Error(ResEnum.FAILURE + `There is no contact with id: ${id}`)
            await this.prismaService.contact.update({where: {id}, data: {deleted: true}});
        } catch (e) {
            console.log('deleteContact', e.message)
            throw new Error(e)
        }
    }
}
