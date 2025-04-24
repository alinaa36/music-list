module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier', // Додаємо Prettier
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'prettier'],
  rules: {
    // Підключаємо правило Prettier для лапок
    'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'all' }],
    'no-unused-vars': 'warn',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off', // Не потрібно в Next.js
  },
};
