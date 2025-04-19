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
    'prettier',
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
    // Загальні правила для всіх файлів
    'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'all' }],
    'no-unused-vars': 'warn',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
  },

  // 🔹 Окремі правила для `.js` файлів
  overrides: [
    {
      files: ['*.js', '**/*.js'],
      rules: {
        'react/jsx-indent': 'off', // Вимкнути відступи для JSX в .js файлах
        'react/jsx-max-props-per-line': 'off', // Вимкнути ліміт пропсів у .js файлах
      },
    },

    // 🔹 Окремі правила для `.jsx` файлів
    {
      files: ['*.jsx', '**/*.jsx'],
      rules: {
        'react/jsx-max-props-per-line': [
          'error',
          { maximum: 1, when: 'multiline' },
        ],
        'react/jsx-indent': ['error', 2],
        'react/jsx-indent-props': ['error', 2],
        'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
        'react/jsx-curly-spacing': ['error', 'never'], // Без пробілів у фігурних дужках JSX
        'react/jsx-boolean-value': ['error', 'never'],
        'react/jsx-fragments': ['error', 'syntax'],
        'react/jsx-no-useless-fragment': 'error',
        'react/jsx-props-no-spreading': 'warn',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-quotes': ['error', 'prefer-double'], // Подвійні лапки в JSX
        'react/self-closing-comp': [
          'error',
          {
            component: true,
            html: true,
          },
        ],
        'react/jsx-tag-spacing': [
          'error',
          {
            closingSlash: 'never',
            beforeSelfClosing: 'always', // Один пробіл перед `/>`
            afterOpening: 'never',
            beforeClosing: 'never',
          },
        ],
      },
    },
  ],
};
