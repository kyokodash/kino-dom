import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import importFsdPlugin from 'eslint-plugin-import-fsd';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
    },
    {
        files: [
            'src/{app,processes,pages,widgets,features,entities,shared}/**/*.{ts,tsx}',
        ],
        extends: [importFsdPlugin.configs.recommended],
        settings: {
            fsd: {
                rootDir: './src',
                aliases: {
                    '@/*': './src/*',
                },
            },
        },
    },
    {
        files: ['**/*.{ts,tsx,js,jsx}'],

        plugins: {
            'simple-import-sort': simpleImportSort,
        },

        rules: {
            'simple-import-sort/imports': [
                'error',

                {
                    groups: [
                        ['^react', '^@?\\w'],

                        ['^@/app'],

                        ['^@/processes'],

                        ['^@/pages'],

                        ['^@/widgets'],

                        ['^@/features'],

                        ['^@/entities'],

                        ['^@/shared'],

                        ['^\\.'],
                    ],
                },
            ],

            'simple-import-sort/exports': 'error',
        },
    },
]);
