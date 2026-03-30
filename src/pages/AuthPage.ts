import { Page } from '@playwright/test'

import { LocatorsDictionary, LocatorsMapping, TestEnv } from '../types/types'
import { locatorsCreator } from './pages-utils/locators-creator'

export class AuthPage {
    static LOCATORS_MAPPING = {
        loginField: (page) => page.getByPlaceholder('логин', { exact: true }),
        passwordField: (page) => page.getByPlaceholder('пароль', { exact: true }),
        loginButton: (page) => page.getByRole('button', { name: 'Войти' }),
    } satisfies LocatorsMapping

    locators: LocatorsDictionary<(typeof AuthPage)['LOCATORS_MAPPING']>
    login: string
    password: string

    constructor(
        private page: Page,
        private env: TestEnv,
    ) {
        this.login = this.env.login
        this.password = this.env.password
        this.locators = locatorsCreator(page, AuthPage.LOCATORS_MAPPING)
    }

    async openPage() {
        await this.page.goto('/')
    }
}
