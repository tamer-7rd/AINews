import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({ baseDirectory: import.meta.dirname })

// Основная конфигурация ESLint (массив объектов)
const config = [
  // 1. Файлы и папки, которые ESLint должен игнорировать
  {
    ignores: [
      'node_modules/**', // папка с зависимостями
      '.next/**', // папка сборки Next.js
      'next-env.d.ts', // автогенерируемый файл Next.js
    ],
  },

  // 2. Базовые правила JavaScript (рекомендуемые)
  js.configs.recommended,

  // 3. Подключаем правила из других конфигов через совместимость
  ...compat.extends(
    'next/core-web-vitals', // правила Next.js для производительности
    'next/typescript', // правила TypeScript
    'prettier' // отключает конфликтующие с Prettier правила
  ),

  // 4. Ваши кастомные правила
  {
    rules: {
      'no-unused-vars': 'warn', // предупреждение о неиспользуемых переменных
    },
  },
]

// Экспортируем конфигурацию для ESLint
export default config
