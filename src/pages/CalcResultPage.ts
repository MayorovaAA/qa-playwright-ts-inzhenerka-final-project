import { Page } from '@playwright/test'

import { locatorsCreator } from './pages-utils/locators-creator'
import { LocatorsDictionary, LocatorsMapping } from '../types/types'

export class CalcResultPage {
    static LOCATORS_MAPPING = {
        materialValue: (page) => page.getByRole('row', { name: 'Материал' }).getByRole('cell').nth(2),
        countertopTypeValue: (page) => page.getByRole('row', { name: 'Тип столешницы' }).getByRole('cell').nth(2),
        optionsValue: (page) => page.getByRole('row', { name: 'Опции' }).getByRole('cell').nth(2),
        totalPriceValue: (page) => page.getByRole('row', { name: 'Стоимость итоговая' }).getByRole('cell').nth(4),
    } satisfies LocatorsMapping

    locators: LocatorsDictionary<(typeof CalcResultPage)['LOCATORS_MAPPING']>

    constructor(private page: Page) {
        this.locators = locatorsCreator(page, CalcResultPage.LOCATORS_MAPPING)
    }
}
