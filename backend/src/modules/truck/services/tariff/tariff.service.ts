import {PrismaService} from "../../../../core/prisma.service";
import {CreateTariffDto, TariffEntity} from "../../dto";
import {Injectable} from "@nestjs/common";

@Injectable()
export class TariffService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async getAll(): Promise<TariffEntity[]> {
        try {
            return await this.prismaService.tariff.findMany();
        } catch (e) {
            console.log(`!!! Failure on getting data: ### ${e.meta.cause} ###`);
            throw new Error(e)
        }
    }

    async createMany(data: CreateTariffDto[]): Promise<void> {
        try {
            for (let item of data) {
                const isExist = await this.prismaService.tariff.findUnique({where: {id: item.id}});
                if (!isExist) await this.prismaService.tariff.create({data: item});
            }
            return;
        } catch (e) {
            console.log(`!!! Failure on creating: ### ${e.meta.cause} ###`);
            throw new Error(e)
        }
    }

    async updateMany(data: CreateTariffDto[]): Promise<void> {
        try {
            for (let item of data) {
                await this.prismaService.tariff.update({
                        where: {
                            id: +item.id
                        },
                        data: item
                    })
            }
            return;
        } catch (e) {
            console.log(`!!! Failure on updating: ### ${e.meta.cause} ###`);
            throw new Error(e)
        }
    }

    async deleteMany(ids: number[]): Promise<void> {
        try {
            for (let id of ids) {
                await this.prismaService.tariff.delete({where: {id}});
            }
            return;
        } catch (e) {
            console.log(`!!! Failure on deleting: ### ${e.meta.cause} ###`);
            throw new Error(e);
        }
    }
}