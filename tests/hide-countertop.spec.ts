import { expect } from '@playwright/test'
import { feature, step } from 'allure-js-commons'

import { AuthPage } from '../src/pages/AuthPage'
import { MainPage } from '../src/pages/MainPage'
import { test } from '../src/fixtures/test-fixture'

let authPage: AuthPage
let mainPage: MainPage

test.beforeAll(async () => {
    await feature('Скрытие столешницы')
})

test.describe('Hide Countertop', async () => {
    test.beforeEach(async ({ page, env }) => {
        authPage = new AuthPage(page, env)
        mainPage = new MainPage(page)

        await step('Log in', async () => {
            await authPage.logIn()
        })
    })

    test('Hide Countertop by clicking on Hide countertop area', async () => {
        await step('Click "Hide countertop" area', async () => {
            await mainPage.locators.hideCountertopArea.click()
        })

        await step('Check "Show countertop" message is visible', async () => {
            await expect(mainPage.locators.showCountertopArea.getByText('Показать столешницу')).toBeVisible()
        })
    })

    test('Hide Countertop by clicking on Hide countertop toggle', async () => {
        await step('Click "Hide countertop" toggle', async () => {
            await mainPage.locators.hideCountertopToggle.click()
        })

        await step('Check "Show countertop" message is visible', async () => {
            await expect(mainPage.locators.showCountertopArea.getByText('Показать столешницу')).toBeVisible()
        })
    })

    test('Hide Countertop by clicking on Hide countertop text', async () => {
        await step('Click "Hide countertop" text', async () => {
            await mainPage.locators.hideCountertopText.click()
        })

        await step('Check "Show countertop" message is visible', async () => {
            await expect(mainPage.locators.showCountertopArea.getByText('Показать столешницу')).toBeVisible()
        })
    })
})
