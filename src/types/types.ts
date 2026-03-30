import { Locator, Page } from '@playwright/test'

export type LocatorsMapping = Record<string, string | ((page: Page) => Locator)>

export type LocatorsDictionary<T extends LocatorsMapping> = Record<keyof T, Locator>

export type TestEnv = {
    baseURL: string
    login: string
    password: string
}

export type AuthWorkerFixture = {
    authedPage: Page
}
