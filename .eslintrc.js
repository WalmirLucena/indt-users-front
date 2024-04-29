module.exports = {
    env: {
      browser: true,
      es2021: true,
      'jest/globals': true,
    },
    parser: '@typescript-eslint/parser',
    extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'plugin:@typescript-eslint/recommended'],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 13,
      sourceType: 'module',
    },
    plugins: ['react', 'jest', 'prettier', '@typescript-eslint'],
    rules: {
      semi: 0,
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-filename-extension': 0,
      'react/jsx-props-no-spreading': 0,
      'react/destructuring-assignment': 0,
      'import/no-unresolved': 0,
      'prettier/prettier': 'error',
      'import/prefer-default-export': 0,
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'import/extensions': 0,
      'no-param-reassign': ['error', { props: false }],
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/jsx-no-constructed-context-values': 0,
      'no-unused-expressions': ['error', { allowTernary: true }],
      'no-extra-boolean-cast': 0,
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['error'],
    },
  };
  