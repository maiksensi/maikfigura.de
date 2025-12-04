import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...nextCoreWebVitals,
  {
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
  {
    ignores: ['.next/', 'out/', 'node_modules/', '.pnpm-store/', 'dist/', 'build/'],
  },
]

export default config
