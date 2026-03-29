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

        chooseUShapedCountertopButton: (page) => page.getByTestId('countertop-type-u'),
        uShapedCountertopLines: '.line[class*="c-U"]',

        countertopThicknessSelector: (page) =>
            page.locator('div:is([class^="style_layer"], [class*=" style_layer"])').getByTestId('select-thickness'),

        countertopThicknessFour: '[class*="styles_options"]',

        skirtingButton: (page) =>
            page.getByTestId('top-button').filter({ has: page.getByText('Плинтус', { exact: true }) }),

        islandButton: (page) =>
            page.getByTestId('product-item').filter({ has: page.getByText('Остров', { exact: true }) }),

        waterDrainageGrooves: (page) =>
            page
                .getByTestId('options-item')
                .filter({ has: page.getByText('Проточки для стока воды', { exact: true }) }),

        searchField: (page) => page.getByTestId('search'),

        colourN103: (page) =>
            page.getByTestId('stone-block').filter({ has: page.getByText('N-103 Gray Onix', { exact: true }) }),

        calcPriceButton: (page) => page.getByTestId('calc-button'),
        openCalculationButton: (page) => page.getByTestId('open-report-button'),
    } satisfies LocatorsMapping

    locators: LocatorsDictionary<(typeof MainPage)['LOCATORS_MAPPING']>

    constructor(private page: Page) {
        this.locators = locatorsCreator(page, MainPage.LOCATORS_MAPPING)
    }
}
