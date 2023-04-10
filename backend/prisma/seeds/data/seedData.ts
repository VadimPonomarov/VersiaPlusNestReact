import {Prisma} from '@prisma/client';
import {Browser, chromium, Page} from 'playwright';
import config from '../../../src/config/configuration';
import {CreateTariffDto} from '../../../src/modules/truck/dto';
import * as fs from "fs";

import {initialData} from "./constants.config";
import {join} from "path";
import {cwd} from "process";

export const userAdminData: Prisma.UserCreateInput = {
    ...initialData
};

export const tariffData: () => CreateTariffDto[] = () => {
    const _tariffs = [];
    const lines = fs.readFileSync(join(cwd(), 'public', 'Тарифы.txt'), 'utf-8').split(/\r?\n/);
    for (let item of lines) {
        const res = item.match(/\d+,*\d*/g);
        if (res) _tariffs.push(res)
    }
    return _tariffs;
};

export const _truckList: () => Promise<{ _trucksMapped, page, browser }> = async () => {
    const browser: Browser = await chromium.launch();
    const page: Page = await browser.newPage();
    await page
        .goto(config().scrapeProvider.goTo);
    await page
        .type('#user', config().scrapeProvider.logName);
    await page
        .type('#passw', config().scrapeProvider.pass);
    await page
        .click('#submit');
    await page
        .locator('#hb_mi_monitoring > div > span')
        .click();
    const trucks = await page
        .locator("xpath=//span[contains(@dir,'auto')]")
        .allInnerTexts();
    const _trucksMapped = [];
    trucks.map(
        async (item) =>
            await (item.match('^.*\\d{4}.*$')
                ? _trucksMapped.push({
                    name: item
                })
                : false),
    );
    return {_trucksMapped, page, browser};
};
