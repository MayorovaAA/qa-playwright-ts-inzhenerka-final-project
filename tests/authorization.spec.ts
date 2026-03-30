import { expect } from '@playwright/test'
import { feature, step } from 'allure-js-commons'

import { test } from '../src/fixtures/test-fixture'
import { AuthPage } from '../src/pages/AuthPage'
import { MainPage } from '../src/pages/MainPage'

let authPage: AuthPage
let mainPage: MainPage

test.beforeAll(async () => {
    await feature('Авторизация')
})

test.describe('Authorization. Positive tests', async () => {
    test.beforeEach(async ({ page, env }) => {
        authPage = new AuthPage(page, env)
        mainPage = new MainPage(page)

        await step('Go to auth page', async () => {
            await authPage.openPage()
        })
    })

    test('Successful Authorization', async () => {
        await step('Fill login', async () => {
            await authPage.locators.loginField.fill(authPage.login)
        })

        await step('Fill password', async () => {
            await authPage.locators.passwordField.fill(authPage.password)
        })

        await step('Click [Log in]', async () => {
            await authPage.locators.loginButton.click()
        })

        await step('Check if auth is successful', async () => {
            await expect(mainPage.locators.userName).toBeVisible()
            await expect(mainPage.locators.logOutButton).toBeVisible()
            await expect(mainPage.locators.pageHeading).toBeVisible()
        })
    })
})

test.describe('Authorization. Negative tests', async () => {
    test.beforeEach(async ({ page, env }) => {
        authPage = new AuthPage(page, env)
        mainPage = new MainPage(page)

        await step('Go to auth page', async () => {
            await authPage.openPage()
        })
    })

    test('Wrong login', async ({ page }) => {
        await step('Fill wrong login', async () => {
            await authPage.locators.loginField.fill('lolo@kek.com')
        })

        await step('Fill password', async () => {
            await authPage.locators.passwordField.fill(authPage.password)
        })

        await step('Click [Log in]', async () => {
            await authPage.locators.loginButton.click()
        })

        await step('Check if auth request returned 401', async () => {
            const response = await page.waitForResponse('https://api2.topklik.online/auth/login')
            const responseStatus = response.status()
            expect(responseStatus).toBe(401)
        })
    })

    test('Wrong password', async ({ page }) => {
        await step('Fill  login', async () => {
            await authPage.locators.loginField.fill(authPage.login)
        })

        await step('Fill wrong password', async () => {
            await authPage.locators.passwordField.fill('lolo')
        })

        await step('Click [Log in]', async () => {
            await authPage.locators.loginButton.click()
        })

        await step('Check if auth request returned 401', async () => {
            const response = await page.waitForResponse('https://api2.topklik.online/auth/login')
            const responseStatus = response.status()
            expect(responseStatus).toBe(401)
        })
    })

    test('Empty login', async ({ page }) => {
        await step('Fill empty login', async () => {
            await authPage.locators.loginField.fill('')
        })

        await step('Fill password', async () => {
            await authPage.locators.passwordField.fill(authPage.password)
        })

        await step('Click [Log in]', async () => {
            await authPage.locators.loginButton.click()
        })

        await step('Expect auth request is not called', async () => {
            const authRequestCallStatus = await page
                .waitForRequest((req) => req.url().includes('/auth/login'), { timeout: 2000 })
                .then(
                    () => true,
                    () => false,
                )

            expect(authRequestCallStatus).toBe(false)
        })
    })

    test('Empty password', async ({ page }) => {
        await step('Fill  login', async () => {
            await authPage.locators.loginField.fill(authPage.login)
        })

        await step('Fill empty password', async () => {
            await authPage.locators.passwordField.fill('')
        })

        await step('Click [Log in]', async () => {
            await authPage.locators.loginButton.click()
        })

        await step('Expect auth request is not called', async () => {
            const authRequestCallStatus = await page
                .waitForRequest((req) => req.url().includes('/auth/login'), { timeout: 2000 })
                .then(
                    () => true,
                    () => false,
                )

            expect(authRequestCallStatus).toBe(false)
        })
    })
})
