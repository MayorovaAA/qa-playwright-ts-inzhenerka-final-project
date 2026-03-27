import eslint from '@eslint/js'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginImport from 'eslint-plugin-import'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    pluginImport.flatConfigs.recommended,
    pluginImport.flatConfigs.errors,
    pluginImport.flatConfigs.warnings,
    pluginPrettierRecommended,
    { files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'] },
    { ignores: ['**/node_modules/*', '**/dist/*'] },
    {
        languageOptions: {
            ecmaVersion: 'latest',
            globals: globals.browser,
        },
    },
    {
        rules: {
            'prettier/prettier': 'off',
            'import/newline-after-import': ['error', { count: 1 }],
            'import/order': [
                'error',
                {
                    groups: [['builtin', 'external'], ['internal'], ['index', 'sibling', 'parent']],
                    'newlines-between': 'always',
                },
            ],
            'import/first': ['error', 'disable-absolute-first'],
            'import/no-named-as-default': 'off',
            'import/no-named-as-default-member': 'off',
            'import/no-unresolved': ['off'],
            "import/named": 'off',
            'no-console': ['warn', { allow: ['time', 'timeEnd', 'info', 'warn', 'error'] }],
        },
    },
)
