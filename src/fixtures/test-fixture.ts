import { test as base } from '@playwright/test'

import { TestEnv } from '../types/types'
import { env } from './utils/env-validator'

export const test = base.extend<{ env: TestEnv }>({
    // eslint-disable-next-line no-empty-pattern
    env: async ({}, use) => {
        await use(env)
    },
})
