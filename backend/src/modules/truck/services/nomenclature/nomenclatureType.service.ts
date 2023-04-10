import {PrismaService} from "../../../../core/prisma.service";
import {CreateNomenclatureTypeDto} from "../../dto";
import {Injectable} from "@nestjs/common";
import {NomenclatureTypeEntity} from "../../dto/entities/nomenclatureType.entity";

@Injectable()
export class NomenclatureTypeService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async getAll(): Promise<Partial<NomenclatureTypeEntity>[]> {
        try {
            return this.prismaService.nomenclatureType.findMany();
        } catch (e) {
            console.log(`!!! Failure on getting data: ### ${e.meta.cause} ###`);
            throw new Error(e)
        }
    }

    async create(data: CreateNomenclatureTypeDto): Promise<void> {
        try {
            await this.prismaService.nomenclatureType.create({data});
        } catch (e) {
            console.log(`!!! Failure on creating: ### ${e.meta.cause} ###`);
            throw new Error(e)
        }
    }

    async update(id: number, data: CreateNomenclatureTypeDto): Promise<void> {
        try {
            await this.prismaService.nomenclatureType.update({
                where: {id},
                data,
            });
        } catch (e) {
            console.log(`!!! Failure on updating: ### ${e.meta.cause} ###`);
            throw new Error(e)
        }
    }

    async deleteOne(id: number): Promise<void> {
        try {
            await this.prismaService.nomenclatureType.delete({where: {id: +id}});
        } catch (e) {
            console.log(`!!! Failure on deleting: ### ${e.meta.cause} ###`);
            throw new Error(e);
        }
    }

}