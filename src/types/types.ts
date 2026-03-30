import { type BrowserContext, Locator, Page } from '@playwright/test'

export type LocatorsMapping = Record<string, string | ((page: Page) => Locator)>

export type LocatorsDictionary<T extends LocatorsMapping> = Record<keyof T, Locator>

export type StorageState = Awaited<ReturnType<BrowserContext['storageState']>>

export type TestEnv = {
    baseURL: string
    login: string
    password: string
}

export type AuthFixture = {
    authState: StorageState
    authedPage: Page
    baseUrl: string
}
