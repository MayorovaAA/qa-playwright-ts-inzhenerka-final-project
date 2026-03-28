import { Page } from '@playwright/test'

import { LocatorsDictionary, LocatorsMapping } from '../../types/types'

export function locatorsCreator<T extends LocatorsMapping>(page: Page, mapping: T): LocatorsDictionary<T> {
    return Object.fromEntries(
        Object.entries(mapping).map(([name, selector]) => {
            const locator = typeof selector === 'string' ? page.locator(selector) : selector(page)
            return [name, locator] as const
        }),
    ) as LocatorsDictionary<T>
}
