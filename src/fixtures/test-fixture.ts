/* eslint-disable @typescript-eslint/no-empty-object-type,no-empty-pattern */
import { test as base } from '@playwright/test'

import { AuthWorkerFixture, TestEnv } from '../types/types'
import { validateEnv } from './utils/env-validator'

export const env = validateEnv()

export const test = base
    .extend<{}, { env: TestEnv }>({
        env: [
            async ({}, use) => {
                await use(env)
            },
            { scope: 'worker' },
        ],
    })
    .extend<{}, AuthWorkerFixture>({
        authedPage: [
            async ({ browser, env }, use) => {
                const ctx = await browser.newContext()
                const page = await ctx.newPage()

                await page.goto(env.baseURL)

                const state = await ctx.storageState()
                state.origins
                    .find((origin) => origin.origin.replace(/\/$/, '') === env.baseURL.replace(/\/$/, ''))
                    ?.localStorage.push({ name: 'login', value: env.login }, { name: 'password', value: env.password })

                await ctx.close()

                const context = await browser.newContext({ storageState: state })
                const authedPage = await context.newPage()

                await use(authedPage)

                await context.close()
            },
            { scope: 'worker' },
        ],
    })
