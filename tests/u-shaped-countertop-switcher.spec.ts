import { expect } from '@playwright/test'
import { feature, step } from 'allure-js-commons'

import { AuthPage } from '../src/pages/AuthPage'
import { MainPage } from '../src/pages/MainPage'
import { test } from '../src/fixtures/test-fixture'

let authPage: AuthPage
let mainPage: MainPage

test.beforeAll(async () => {
    await feature('Переключение на П-образную столешницу и ее отображение')
})

test.describe('Ability to choose U-shaped countertop', async () => {
    test.beforeEach(async ({ page, env }) => {
        authPage = new AuthPage(page, env)
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
