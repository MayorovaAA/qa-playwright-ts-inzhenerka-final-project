import { expect, Page } from '@playwright/test'
import { epic, step } from 'allure-js-commons'

import { AuthPage } from '../src/pages/AuthPage'
import { MainPage } from '../src/pages/MainPage'
import { CalcResultPage } from '../src/pages/CalcResultPage'
import { test } from '../src/fixtures/test-fixture'

let authPage: AuthPage
let mainPage: MainPage
let calcResultPage: CalcResultPage

let newPage: Page

test.beforeAll(async () => {
    await epic('Сборка заказа')
})

test.describe('e2e ability to assemble the order', async () => {
    test.beforeEach(async ({ page, env }) => {
        authPage = new AuthPage(page, env)
        mainPage = new MainPage(page)

        await step('Log in', async () => {
            await authPage.logIn()
        })
    })

    test('Order assembly', async ({ page }) => {
        await step('Click "U-shaped" button', async () => {
            await mainPage.locators.chooseUShapedCountertopButton.click()

            await page.waitForLoadState('domcontentloaded')
        })

        await step('Choose thickness 4', async () => {
            await mainPage.locators.countertopThicknessSelector.click()
            await mainPage.locators.countertopThicknessFour.click()
        })

        await step('Remove skirting', async () => {
            await mainPage.locators.skirtingButton.click()
        })

        await step('Add island', async () => {
            await mainPage.locators.islandButton.click()
        })

        await step('Add water drainage grooves', async () => {
            await mainPage.locators.waterDrainageGrooves.click()
        })

        await step('Choose "N-103 Gray Onix" color', async () => {
            await mainPage.locators.searchField.fill('N-103 Gray Onix', {})
            await page.waitForLoadState('domcontentloaded')
            await mainPage.locators.colourN103.click()
        })

        await step('Click calc price button', async () => {
            await mainPage.locators.calcPriceButton.click()
        })

        await step('Click "Calculation" button', async () => {
            ;[newPage] = await Promise.all([
                page.context().waitForEvent('page'),
                await mainPage.locators.openCalculationButton.click(),
            ])
            await newPage.waitForURL('https://report.topklik.online/calculation**')

            calcResultPage = new CalcResultPage(newPage)
        })

        await step('Ensure calculation report opens in new page', async () => {
            expect(await newPage.title()).toBe('Результаты расчета')
            expect(newPage.url()).toContain('https://report.topklik.online/calculation')
        })

        await step('Ensure Material is as chosen in steps above', async () => {
            await expect(calcResultPage.locators.materialValue).toHaveText('acryl:Neomarm:N-103 Gray Onix')
        })

        await step('Ensure countertop Type is as chosen in steps above', async () => {
            await expect(calcResultPage.locators.countertopTypeValue).toHaveText('П-образная')
        })

        await step('Ensure Drainage grooves is as chosen in steps above', async () => {
            await expect(calcResultPage.locators.optionsValue).toHaveText('Проточки для стока воды')
        })

        await step('Ensure total Price is as expected', async () => {
            await expect(calcResultPage.locators.totalPriceValue).toHaveText('413400.00 ₽')
        })
    })
})
