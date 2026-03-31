// @ts-check
import 'dotenv/config'
import { defineConfig, devices } from '@playwright/test'

const isWebstormDebugMode = Boolean(process.env.NODE_OPTIONS && /webstorm.+debugger/i.test(process.env.NODE_OPTIONS))

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig(
    /*<PwConfigCustomUseParams>*/ {
        testDir: './tests',
        /* Run tests in files in parallel */
        fullyParallel: true,
        /* Fail the build on CI if you accidentally left test.only in the source code. */
        forbidOnly: !!process.env.CI,
        /* Retry on CI only */
        retries: process.env.CI ? 0 : 0,
        /* Opt out of parallel tests on CI. */
        workers: process.env.CI ? 1 : undefined,
        /* Reporter to use. See https://playwright.dev/docs/test-reporters */
        reporter: [['allure-playwright'], ['github']],
        /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
        use: {
            /* Base URL to use in actions like `await page.goto('/')`. */
            baseURL: process.env.BASE_URL,

            /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
            trace: 'on-first-retry',
            headless: !isWebstormDebugMode,
        },
        timeout: process.env.CI ? 20000 : 30000,
        expect: {
            timeout: process.env.CI ? 5000 : 5000,
        },
        /* Configure projects for major browsers */
        projects: [
            {
                name: 'chromium',
                use: { ...devices['Desktop Chrome'] },
            },
            {
                name: 'firefox',
                use: { ...devices['Desktop Firefox'] },
            },

            {
                name: 'webkit',
                use: { ...devices['Desktop Safari'] },
            },
        ],
    },
)
