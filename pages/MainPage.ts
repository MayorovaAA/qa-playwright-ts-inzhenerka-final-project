import { Page } from '@playwright/test'

import { locatorsCreator } from './pages-utils/locators-creator'
import { LocatorsDictionary, LocatorsMapping } from '../types/types'

export class MainPage {
    static LOCATORS_MAPPING = {
        userName: (page) => page.getByRole('heading', { name: 'Tester' }),
        logOutButton: (page) => page.getByRole('button', { name: 'Выйти' }),

        pageHeading: (page) => page.getByRole('heading', { name: 'Калькулятор столешниц' }),

        hideCountertopArea: (page) => page.getByTestId('hide-countertop'),
        hideCountertopToggle: (page) => page.getByTestId('hide-countertop').getByAltText('toggle'),
        hideCountertopText: (page) => page.getByTestId('hide-countertop').getByText('Скрыть столешницу'),

        showCountertopArea: (page) => page.getByTestId('show-main'),
    } satisfies LocatorsMapping

    locators: LocatorsDictionary<(typeof MainPage)['LOCATORS_MAPPING']>

    constructor(private page: Page) {
        this.locators = locatorsCreator(page, MainPage.LOCATORS_MAPPING)
    }
}
