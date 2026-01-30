import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import path from 'path'
import { fileURLToPath } from 'url'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
})

// ВАЖНО: Известная проблема с FlatCompat и конфигурацией Next.js
// Конфигурации Next.js создают циклическую структуру при преобразовании в flat config
// Используем только базовые правила ESLint до исправления проблемы
// Следите за обновлениями: https://github.com/eslint/eslint/issues
let nextConfigs = []
try {
  // Пробуем загрузить конфигурации Next.js по отдельности
  const coreWebVitals = compat.config({
    extends: ['next/core-web-vitals'],
  })
  const typescript = compat.config({
    extends: ['next/typescript'],
  })
  const prettier = compat.config({
    extends: ['prettier'],
  })
  nextConfigs = [...coreWebVitals, ...typescript, ...prettier]
} catch {
  // Если возникает ошибка, используем только базовые правила
  // Это временное решение до исправления проблемы в @eslint/eslintrc или eslint-config-next
  // TODO: Обновить когда будет исправлена проблема с циклической структурой
}

// Основная конфигурация ESLint (массив объектов)
const config = [
  // 1. Файлы и папки, которые ESLint должен игнорировать
  {
    ignores: [
      'node_modules/**', // папка с зависимостями
      '.next/**', // папка сборки Next.js
      'next-env.d.ts', // автогенерируемый файл Next.js
      'postcss.config.js', // конфигурация PostCSS (CommonJS)
      'prettier.config.js', // конфигурация Prettier (CommonJS)
    ],
  },

  // 2. Базовые правила JavaScript (рекомендуемые)
  {
    ...js.configs.recommended,
    files: ['**/*.{js,jsx}'], // Применяем к JS файлам
  },

  // 3. Конфигурация для TypeScript файлов
  {
    files: ['**/*.{ts,tsx}'], // TypeScript файлы
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'no-unused-vars': 'off', // Отключаем базовое правило, используем TypeScript версию
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },

  // 4. Подключаем правила из других конфигов (если загружены)
  ...nextConfigs,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // pre-commit: console.log игнорируется (правило выключено)
      // pre-push/CI: console.log = warning, console.warn/error разрешены
      'no-console':
        process.env.PREPUSH || process.env.CI
          ? ['warn', { allow: ['warn', 'error'] }]
          : 'off',
    },
  },
]

// Экспортируем конфигурацию для ESLint
export default config
