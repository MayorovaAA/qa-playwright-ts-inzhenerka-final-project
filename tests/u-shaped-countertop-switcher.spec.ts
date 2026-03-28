import { expect, test } from '@playwright/test'
import { step } from 'allure-js-commons'

import { AuthPage } from '../pages/AuthPage'
import { MainPage } from '../pages/MainPage'

let authPage: AuthPage
let mainPage: MainPage

test.describe('Ability to choose U-shaped countertop', async () => {
    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page)
        mainPage = new MainPage(page)

        await step('Log in', async () => {
            await authPage.logIn()
        })
    })

    test('Check switch to U-shaped countertop', async ({ page }) => {
        await step('Click "U-shaped" button', async () => {
            await mainPage.locators.chooseUShapedCountertopButton.click()

            await page.waitForLoadState('domcontentloaded')
        })

        await step('Ensure U-shaped countertop is chosen', async () => {
            await expect(mainPage.locators.uShapedCountertopLines).toHaveCount(8)
        })
    })
})
