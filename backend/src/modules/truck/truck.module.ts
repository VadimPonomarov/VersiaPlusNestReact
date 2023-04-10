import {Module} from '@nestjs/common';
import {TruckController} from './controllers/truck.controller';
import {TruckService} from './services/truck/truck.service';
import {PrismaService} from '../../core/prisma.service';
import {ScrapingProvider} from './providers';
import {JwtProvider} from '../auth/providers';
import {JwtService} from '@nestjs/jwt';
import {NomenclatureController} from "./controllers/nomenclature.controller";
import {NomenclatureTypeService} from "./services/nomenclature/nomenclatureType.service";
import {NomenclatureService} from "./services/nomenclature/nomenclature.service";
import {TariffService} from "./services/tariff/tariff.service";
import {TariffController} from "./controllers/tariff.controller";
import {ContactController} from "./controllers/contact.controller";
import { ConsumerController } from './controllers/consumer.controller';
import {ConsumerService} from "./services/consumer/consumer.service";
import { ContactService } from './services/contact/contact.service';

@Module({
    controllers: [TruckController, ConsumerController, NomenclatureController, TariffController, ContactController],
    providers: [
        TruckService,
        PrismaService,
        ScrapingProvider,
        JwtProvider,
        JwtService,
        ConsumerService,
        NomenclatureTypeService,
        NomenclatureService,
        TariffService,
        ContactService,
    ]
})

export class TruckModule {
}
