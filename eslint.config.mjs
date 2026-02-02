// eslint.config.mjs – flat configuration for Next.js 16+
import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default defineConfig([
  // ignore patterns
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'next-env.d.ts',
      'out/**',
      'build/**',
      'postcss.config.js',
      'prettier.config.js',
    ],
  },

  // JavaScript rules
  {
    ...js.configs.recommended,
    files: ['**/*.{js,jsx}'],
  },

  // Next.js Core Web Vitals preset (includes react-hooks)
  ...nextVitals,

  // Next.js TypeScript preset (includes @typescript-eslint)
  ...nextTs,

  // Disable rules that conflict with Prettier
  eslintConfigPrettier,

  // Override default Next.js ignores
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),

  // Custom rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // TypeScript: смягчаем no-unused-vars до warn
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',

      // Console: игнор в pre-commit, warn в pre-push/CI
      'no-console':
        process.env.PREPUSH || process.env.CI
          ? ['warn', { allow: ['warn', 'error'] }]
          : 'off',

      // React Hooks: правильное использование хуков
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // React: самозакрывающиеся теги для пустых компонентов
      'react/self-closing-comp': 'warn',

      // Качество кода
      'eqeqeq': ['warn', 'always'], // === вместо ==
      'no-debugger': 'warn', // напоминание убрать debugger
    },
  },
])