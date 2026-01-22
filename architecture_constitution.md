Narraive / AiNews — Architecture Constitution (v0)

---

<span style="color: #00CED1">**Цель:**</span> чтобы проект рос как система (модули + границы), а не как набор страниц и случайных компонентов.  
Этот файл фиксирует “конституцию”: **где что лежит**, **кто от кого зависит**, **что запрещено**.

---

## 1) Схема папок (сейчас)

```
src/
  app/                 # Next App Router: страницы/лейауты (UI entrypoints)
  components/          # shared UI (дизайн-система) и общий layout
    ui/                # Button/Input/Link/... (атомы, не знают про домен)
    layout/            # Header/Footer/Nav/... (layout приложения)
    common/            # общие мелочи (Logo и т.п.)
  features/            # фичи/модули (News/Analytics/Auth/...)
    news/
      components/      # UI фичи (NewsCard, NewsList, Filters)
  lib/                 # shared non-UI код (utils/constants), можно юзать везде
    utils/             # cn(), форматеры общего назначения и т.п.
    constants/         # routes, конфиги без секретов и т.п.
  styles/              # глобальные/общие стили
```

---

## 2) Схема папок (как будет расти)

### Внутри каждой фичи (`src/features/<feature>/`)

Рекомендуемая структура:

```
src/features/news/
  components/          # feature UI (доменно-специфичные компоненты)
  model/               # доменные типы/мапперы (Article, Source, Tag...)
  api/                 # вызовы BFF (fetchers/clients), DTO типы
  lib/                 # утилиты только для news (formatDate, mapDTO, ...)
  index.ts             # public API фичи (экспорты наружу)
```

Та же идея для:

- `src/features/analytics/`
- `src/features/auth/` (или `account/` — как в плане)
- позже: `src/features/billing/`

### Общий домен (когда вырастет)

Если начнёт дублироваться доменная логика между фичами, вводим:

```
src/domain/            # общий домен проекта (shared types, error-codes, policies)
src/data/              # репозитории/доступ к DB (Prisma) и кэш
src/server/            # server-only модули (BFF, интеграции, observability)
```

---

## 3) Правила зависимостей (слои и границы)

### 3.1 UI vs Domain vs Data

- **UI layer (`src/app`, `src/components`)**
  - отображение, композиция компонентов
  - НЕ содержит доменную логику и интеграции
- **Feature UI (`src/features/*/components`)**
  - доменно-специфичный UI (NewsCard и т.п.)
  - собирается из `components/ui`
- **Domain layer (`src/features/*/model` и/или `src/domain`)**
  - типы, правила, мапперы, политики ошибок
  - не зависит от React/DOM
- **Data/BFF layer (`src/app/api` / server actions / `src/server`)**
  - единственная точка интеграции с внешними API/DB/AI/платежами
  - валидирует внешние данные (zod), нормализует, кэширует

### 3.2 Золотое правило

**Всё внешнее = untrusted input → validate → normalize → только потом в UI/DB.**

---

## 4) Что куда класть (быстрый чеклист)

### `src/components/ui/*`

Класть сюда, если:

- компонент **переиспользуем** в разных фичах
- компонент **не знает** про Article/User/Metric и т.п.

Примеры: `Button`, `Input`, `Modal`, `Tabs`, `Badge`, `Card`.

### `src/features/<feature>/components/*`

Класть сюда, если:

- компонент **про домен** (news/article/tags, analytics/series, auth/form)
- он “живёт” внутри одной фичи и не обязан быть общим

Примеры: `NewsCard`, `NewsList`, `NewsFilters`, `AnalyticsChartCard`, `LoginForm`.

### `src/lib/*`

Класть сюда, если:

- утилита **общая** для нескольких фич/слоёв
- не зависит от React

Примеры: `cn()`, `routes`, общие форматеры/хелперы.

### `src/features/<feature>/lib/*`

Класть сюда, если:

- утилита **строго про одну фичу**

Примеры: `formatArticleDate`, `mapHnItemToArticle`, `buildNewsQuery`.

---

## 5) Правила именования (чтобы не расползлось)

- **Shared UI**: короткие общие имена (`Button`, `Input`, `Modal`).
- **Feature UI**: имена с доменным смыслом (`NewsCard`, `AnalyticsChart`, `AuthForm`).
- **Запрещено**: создавать `Button.tsx` внутри `features/*` (это ломает единую дизайн-систему).

---

## 6) Public API фичи (защита границ)

Рекомендация:

- `src/features/news/index.ts` экспортирует наружу только нужное (например `NewsCard`, `NewsList`).
- `src/app/*` импортит фичу через `@/features/news`, а не через глубокие пути.

Цель: чтобы внутренности фичи можно было менять без переписывания всего приложения.

---

## 7) Server-only правила (BFF/секреты)

- Никаких ключей источников/секретов на клиенте.
- Внешние API вызываются только на сервере (BFF).
- Ошибки нормализуются в единый `ApiError`.
- Логи без PII; есть `requestId` для трассировки.

---

## 8) Ссылки на план и артефакты

- План: `project_planning/Plan/plan_main.md`
- Архитектура (подробно): `project_planning/Plan/additional_planDocs/ARCHITECTURE.md`
- API контракт: `project_planning/Plan/additional_planDocs/API_CONTRACT.md`
- Observability: `project_planning/Plan/additional_planDocs/OBSERVABILITY.md`
