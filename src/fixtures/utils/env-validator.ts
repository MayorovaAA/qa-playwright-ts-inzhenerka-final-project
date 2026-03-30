import { TestEnv } from '../../types/types'

function validateEnv(): TestEnv {
    const errors: string[] = []
    if (!process.env.BASE_URL) errors.push('You must provide a BASE_URL first')
    if (!process.env.LOGIN) errors.push('You must provide a LOGIN first')
    if (!process.env.PASSWORD) errors.push('You must provide a PASSWORD first')
    if (errors.length > 0) {
        const message = ['Env errors:', ...errors].join('\n')
        throw new Error(message)
    }
    return {
        baseURL: process.env.BASE_URL,
        login: process.env.LOGIN,
        password: process.env.PASSWORD,
    } as TestEnv
}

export const env = validateEnv()
