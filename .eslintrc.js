module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'prefer-arrow-callback': ['error', { allowUnboundThis: false }],
        'no-await-in-loop': ['error'],
        'no-alert': 'error',
        'no-restricted-imports': [
            'error',
            {
                patterns: [
                    '@material-ui/*/*/*',
                    '!@material-ui/core/test-utils/*',
                ],
            },
        ],
    },
}
