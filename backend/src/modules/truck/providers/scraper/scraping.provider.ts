import {CreateTruckDto, ParsingEntity, TruckNamesListDto} from '../../dto';
import {PrismaService} from 'src/core/prisma.service';
import {Injectable} from "@nestjs/common";
import {Cron, CronExpression} from "@nestjs/schedule";
import {Browser, BrowserContext, Page} from "playwright";
import config from '../../../../config/configuration';
import {InjectBrowser, InjectContext} from "nestjs-playwright";
import {isNotEmpty, notEquals} from "class-validator";

@Injectable()
export class ScrapingProvider {
    constructor(
        private readonly prismaService: PrismaService,
        @InjectBrowser() private readonly browser: Browser,
        @InjectContext() private readonly browserContext: BrowserContext,
    ) {

    }

    async getTools(): Promise<Page> {
        try {
            const page = await this.browserContext.newPage();
            await page.setViewportSize(config().scrapeProvider.viewport);
            await page.goto(config().scrapeProvider.goTo);
            await page.type('#user', config().scrapeProvider.logName);
            await page.type('#passw', config().scrapeProvider.pass);
            await page.click('#submit');
            await page.waitForSelector('#hb_mi_monitoring > div > span');
            await page.click('#hb_mi_monitoring > div > span');
            return page;
        } catch (e) {
            console.log(e.message)
        }
    }

    async scrapeTruckList(): Promise<TruckNamesListDto[]> {
        const page = await this.getTools();
        try {
            const trucks = await page
                .locator("xpath=//span[contains(@dir,'auto')]")
                .allInnerTexts();
            const _trucksMapped = [];
            trucks.map(
                (item) =>
                    (item.match('^.*\\d{4}.*$')
                        ? _trucksMapped.push({
                            name: item
                        })
                        : false),
            );
            return _trucksMapped;
        } catch (e) {
            console.log(e.message);
        } finally {
            await page.close();
        }
    }

    @Cron(CronExpression.EVERY_WEEKDAY)
    async updateTruckList(): Promise<void> {
        try {
            const _trucksMapped = await this.scrapeTruckList();
            _trucksMapped.map((item: CreateTruckDto) => {
                const isExist = this.prismaService.truck.findUnique({
                    where: {
                        name: item.name
                    }
                });
                if (!!isExist) {
                    this.prismaService.truck
                        .update({
                            where: {
                                name: item.name
                            },
                            data: {
                                name: item.name
                            }
                        })
                } else {
                    this.prismaService.truck
                        .create({
                            data: {
                                name: item.name
                            }
                        })
                }
            })
        } catch (e) {
            console.log(e.message)
        }
    }

    @Cron(CronExpression.EVERY_30_MINUTES)
    async updateTruckCoordinates(): Promise<void> {
        const isParsingOn: ParsingEntity = await this.prismaService.parsing.findFirst();
        if (!isParsingOn.parsing) return;
        const page = await this.getTools();
        const trucks = await this.getTruckListAllLocal();
        const arr = [];
        try {
            for (const item of trucks as TruckNamesListDto[]) {
                await page
                    .locator(`xpath=//span[contains(text(), "${item.name}")]`)
                    .nth(0)
                    .click()
                    .catch((e) => {
                    });
                await page
                    .waitForSelector(`#tooltip .coordinates .coordinates`)
                    .catch((e) => {
                    });
                const res = await page
                    .$$eval('#tooltip .coordinates .coordinates', (e) =>
                        e.map((item) => item.innerHTML),
                    )
                    .catch((e) => {
                    });
                const _res = await res[0]
                    .replace('<div>', '')
                    .replace('</div>', ',')
                    .replace('<div>', '')
                    .replace('</div>', ',');
                const [lat, lng] = await _res.split(',');
                const info = {
                    stop: '',
                    tracing: ''
                };
                await page
                    .locator(`//span[contains(text(), "${item.name}")]/../../following-sibling::td[2]/span/span`)
                    .nth(0).getAttribute('class')
                    .then(res => info.stop = res.split(/\s+/)[1])
                    .catch(e => {
                    });
                await page
                    .locator(`//span[contains(text(), "${item.name}")]/../../following-sibling::td[4]/span`)
                    .nth(0)
                    .getAttribute('class')
                    .then(res => info.tracing = res.split(/\s+/)[1])
                    .catch(e => {
                    });
                arr.push({
                    name: item.name,
                    latLng: {
                        lat,
                        lng
                    }
                });
                console.log(arr.pop());
                await this.prismaService.truck
                    .update({
                        where: {
                            name: item.name
                        },
                        data: {
                            lat,
                            lng,
                            stop: info.stop,
                            tracing: info.tracing
                        },
                    }).catch(e => {
                    });
            }
        } catch (e) {
            console.log(e.message)
        } finally {
            await page.close();
        }
    }


    async getTruckListAllLocal(): Promise<TruckNamesListDto[]> {
        try {
            return await this.prismaService.truck
                .findMany({
                    select: {
                        name: true
                    }
                });
        } catch (e) {
            console.log(e.message)
        }
    }

    async updateTruckCodes(): Promise<void> {
        const page = await this.getTools();
        try {
            const trucks = await this.getTruckListAllLocal();
            for (const item of trucks) {
                await page
                    .locator(
                        `xpath=//span[contains(text(), "${item.name}")]/../self::div`,
                    )
                    .nth(0)
                    .getAttribute('id')
                    .then(async (id) => {
                        return id.match('\\d{5,7}');
                    })
                    .then(async (code) => {
                        await this.prismaService.truck
                            .update({
                                where: {
                                    name: item.name
                                },
                                data: {
                                    code: code[0].toString()
                                },
                            });
                    })
            }
        } catch (e) {
            console.log(e.message)
        } finally {
            await page.close()
        }
    }
}
