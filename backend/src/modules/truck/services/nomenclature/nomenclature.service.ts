import {PrismaService} from "../../../../core/prisma.service";
import {CreateNomenclatureDto} from "../../dto";
import {Injectable} from "@nestjs/common";
import {Nomenclature} from "@prisma/client";

@Injectable()
export class NomenclatureService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async getAll(): Promise<Nomenclature[]> {
        try {
            return this.prismaService.nomenclature.findMany();
        } catch (e) {
            console.log(`!!! Failure on getting data: ### ${e.meta.cause} ###`);
            throw new Error(e)
        }
    }

    async getOne(id: number): Promise<Nomenclature> {
        try {
            return this.prismaService.nomenclature.findUnique({
                where: {id},
            });
        } catch (e) {
            console.log(`!!! Failure on getting data: ### ${e.meta.cause} ###`);
            throw new Error(e)
        }
    }

    async create(body: CreateNomenclatureDto): Promise<void> {
        try {
            await this.prismaService.nomenclature.create({data: body});
        } catch (e) {
            console.log(`!!! Failure on creating: ### ${e.meta.cause} ###`);
            throw new Error(e)
        }
    }

    async update(id: number, data: CreateNomenclatureDto):Promise<void> {
        try {
            await this.prismaService.nomenclature.update({
                where: {id},
                data,
            });
        } catch (e) {
            console.log(`!!! Failure on updating: ### ${e.meta.cause} ###`);
            throw new Error(e)
        }
    }

    async deleteOne(id: number):Promise<void> {
        try {
            await this.prismaService.nomenclature.delete({where: {id: +id}});
        } catch (e) {
            console.log(`!!! Failure on deleting: ### ${e.meta.cause} ###`);
            throw new Error(e);
        }
    }
}