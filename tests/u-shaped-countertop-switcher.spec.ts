import { expect } from '@playwright/test'
import { feature, step } from 'allure-js-commons'

import { test } from '../src/fixtures/test-fixture'
import { MainPage } from '../src/pages/MainPage'

let mainPage: MainPage

test.beforeAll(async () => {
    await feature('Переключение на П-образную столешницу и ее отображение')
})

test.describe('Ability to choose U-shaped countertop', async () => {
    test.beforeEach(async ({ authedPage }) => {
        mainPage = new MainPage(authedPage)

        await step('Go to Page', async () => {
            await authedPage.goto('/')
        })
    })

    test('Check switch to U-shaped countertop', async ({ authedPage }) => {
        await step('Click "U-shaped" button', async () => {
            await mainPage.locators.chooseUShapedCountertopButton.click()

            await authedPage.waitForLoadState('domcontentloaded')
        })

        await step('Ensure U-shaped countertop is chosen', async () => {
            await expect(mainPage.locators.uShapedCountertopLines).toHaveCount(8)
        })
    })
})
