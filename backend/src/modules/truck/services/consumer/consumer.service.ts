import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../../../core/prisma.service";
import {ResEnum} from "../../../../common/constants";
import {CreateConsumerDto} from "../../dto";

@Injectable()
export class ConsumerService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async getAll(): Promise<any> {
        try {
            return await this.prismaService.consumer
                .findMany({
                    where: {
                        deleted: false
                    },
                    include: {
                        profile: {
                            include: {
                                contacts: true
                            }
                        }
                    }
                });
        } catch (e) {
            console.log('getAll', e.message)
            throw new Error(e.message)
        }
    }

    async getOneById(id: number): Promise<any> {
        try {
            return await this.prismaService.consumer
                .findFirst({
                    where: {
                        id,
                        deleted: false
                    },
                    include: {
                        profile: true
                    }
                });
        } catch (e) {
            console.log('getOneById', e.message)
            throw new Error(e.message)
        }
    }

    async createConsumer(data: CreateConsumerDto): Promise<void> {
        try {
            const isExist =
                await this.prismaService.consumer
                    .findFirst({where: {nick: data.nick}});
            if (isExist)
                throw new Error(ResEnum.FAILURE + `Consumer with the same Nick: ${data.nick} already exist`)
            await this.prismaService.consumer.create({
                data: {
                    nick: data.nick, profile: {
                        create: {
                            ...data.profile
                        }
                    }
                },
                include: {profile: true}
            });
        } catch (e) {
            console.log('createConsumer', e.message)
            throw new Error(e.message)
        }
    }

    async updateConsumer(id: number, data: CreateConsumerDto): Promise<void> {
        try {
            const isExist =
                await this.prismaService.consumer
                    .findFirst({
                        where: {id}
                    });
            if (!isExist)
                throw new Error(ResEnum.FAILURE + `There is no consumer with Id: ${id}`)
            await this.prismaService.consumer
                .update({
                    where: {id},
                    data: {
                        nick: data.nick,
                        profile: {
                            update: data.profile
                        }
                    }
                });
        } catch (e) {
            console.log('deleteConsumer', e.message)
            throw new Error(e.message)
        }
    }

    async deleteConsumer(id: number): Promise<void> {
        try {
            const isExist =
                await this.prismaService.consumer
                    .findFirst({
                        where: {id}
                    });
            if (!isExist)
                throw new Error(ResEnum.FAILURE + `There is no consumer with Id: ${id}`)
            await this.prismaService.consumer
                .update({where: {id}, data: {deleted: true}});
        } catch (e) {
            console.log('deleteConsumer', e.message)
            throw new Error(e.message)
        }
    }
}
