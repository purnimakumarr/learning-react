module.exports = {
  extends: 'next/core-web-vitals',
  settings: {
    next: {
      rootDir: __dirname,
    },
  },
  parserOptions: {
    babelOptions: {
      // Resolve from this project so ESLint works when the editor cwd is the repo root.
      presets: [require.resolve('next/babel')],
    },
  },
  rules: {
    'react/no-unescaped-entities': 'off',
  },
};
