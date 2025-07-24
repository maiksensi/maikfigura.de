import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

export default [
    // Use the compat helper to convert Next.js config to flat format
    ...compat.extends('next/core-web-vitals'),
    {
        rules: {
            // Custom rule overrides
            '@next/next/no-html-link-for-pages': 'off',
            'react/no-unescaped-entities': 'off',
        },
    },
    // Ignore patterns
    {
        ignores: [
            '.next/',
            'out/',
            'node_modules/',
            '.pnpm-store/',
            'dist/',
            'build/',
        ],
    },
];
