import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../../../core/prisma.service';
import {TruckEntity, TruckNamesListDto} from '../../dto';
import {ScrapingProvider} from '../../providers';

@Injectable()
export class TruckService {
    constructor(
        private prismaService: PrismaService,
        private scrapingProvider: ScrapingProvider,
    ) {
    }

    async getTruckListAll(): Promise<TruckNamesListDto[]> {
        try {
            return await this.scrapingProvider.getTruckListAllLocal();
        } catch (e) {
            console.log(e)
            throw new Error(e);
        }
    }
    async getTruckListEntities(): Promise<TruckEntity[]>{
        try {
            return await this.prismaService.truck.findMany();
        } catch (e) {
            console.log(e.message)
            throw new Error(e);
        }
    }

    async createMany(truckList: TruckNamesListDto[]): Promise<void> {
        try {
            const _trucks = truckList
                .map(({name}) => ({name}));
            await this.prismaService.truck
                .createMany({
                    data: _trucks,
                    skipDuplicates: true,
                });
        } catch (e) {
            console.log(e.message)
            throw new Error(e);
        }
    }

    async deleteMany(truckList: TruckNamesListDto[]): Promise<void> {
        try {
            for (const {name} of truckList) {
                await this.prismaService.truck
                    .delete({
                        where: {
                            name
                        }
                    });
            }
        } catch (e) {
            console.log(e.message)
            throw new Error(e);
        }
    }
}
