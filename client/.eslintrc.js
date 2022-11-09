module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    strict: 0,
    'max-len': 0,
    'react/prop-types': 0,
    'comma-dangle': 0,
  },
};
