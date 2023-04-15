import {Prisma, PrismaClient} from '@prisma/client';
import {RoleEnum} from '../../src/common/constants';
import {userAdminData, _truckList, tariffData} from './data';
import {TruckNamesListDto} from "../../src/modules/truck/dto";

const prisma = new PrismaClient();

async function main() {
    try {
        await console.log(`Start seeding ...`);
        const isAdminExist = await prisma
            .user
            .findFirst({
                where: {
                    name: 'admin'
                }
            });
        if (!isAdminExist) {
            /*user*/
            const user = await prisma.user.create({
                data: {
                    ...userAdminData,
                    roles: {create: {name: RoleEnum.ADMIN}},
                },
            });
            await console.log(`User ${user.name} with id: ${user.id} is created`);
        }

        /*trackList*/
        const isTruckListExist = await prisma.truck.findMany();
        if (!isTruckListExist.length) {
            const {_trucksMapped, browser, page} = await _truckList();
            await page.close();
            await browser.close();
            await prisma.truck.createMany({
                data: _trucksMapped,
                skipDuplicates: true,
            });
            await page.close();
            await browser.close();
            console.log(_trucksMapped);
            console.log(
                `Scraping process is finished and initial truckList is created`,
            );
        }

        /*initial tariffs*/
        const isTariffsExist = await prisma.tariff.findMany();
        if (!isTariffsExist.length) {
            const _tariffData = tariffData();
            if (_tariffData) {
                for (let item of _tariffData) {
                    const data = {
                        from: +item[1],
                        upto: +item[2],
                        tariff: +item[3].replace(',', '.'),
                        value: +item[5].replace(',', '.')
                    };
                    await prisma.tariff
                        .create({
                            data
                        });
                }
            } else {
                console.log('Seeding of tariffs failed. You are supposed to place initial data file with actual tariffs to public folder !!!')
            }
        }

        /*truck coordinates*/
        await (async (): Promise<void> => {
            const {_trucksMapped: trucks, browser, page} = await _truckList();
            let arr = [];
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
                    await prisma.truck
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
                await browser.close();
            }
        })()

        /* PARSING TOGGLE */

        const isParsingExist = await prisma.parsing.findMany();
        if (!isParsingExist.length) {
            await prisma.parsing.create({data: {parsing: false}})
        }

        /* THE END OF ALL SEEDING*/

        console.log(`Seeding has finished.`);
    } catch (e) {
        console.log(e);
    }
}


main()
    .catch((e) => {
        console.error(e.message);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })
