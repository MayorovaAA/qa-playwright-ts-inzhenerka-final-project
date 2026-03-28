import { Page } from '@playwright/test'

import { LocatorsDictionary, LocatorsMapping } from '../types/types'
import { locatorsCreator } from './pages-utils/locators-creator'

export class AuthPage {
    static LOCATORS_MAPPING = {
        loginField: (page) => page.getByPlaceholder('логин', { exact: true }),
        passwordField: (page) => page.getByPlaceholder('пароль', { exact: true }),
        loginButton: (page) => page.getByRole('button', { name: 'Войти' }),
    } satisfies LocatorsMapping

    locators: LocatorsDictionary<(typeof AuthPage)['LOCATORS_MAPPING']>

    constructor(
        private page: Page,
        private login: string = 'tester@inzhenerka.tech',
        private password: string = 'LetsTest!',
    ) {
        this.locators = locatorsCreator(page, AuthPage.LOCATORS_MAPPING)
    }

    async openPage() {
        await this.page.goto('/')
    }

    async logIn() {
        await this.openPage()

        await this.locators.loginField.fill(this.login)
        await this.locators.passwordField.fill(this.password)
        await this.locators.loginButton.click()
    }
}
