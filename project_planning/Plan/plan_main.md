План разработки (Этапы 1–12, стиль «докопаться до сути»)

<span style="color: #00CED1">**Этап 1**</span> — Запуск и среда (≈24 ч)    <span style="color: #FF00FF">Выполнено.</span>

- Разбор: что такое Next, зачем встроенный бандлер, чем он отличается от Vite, что такое turbopack/webpack.
- Установка: Node, PNPM, Next+TS, Tailwind, shadcn/ui (убрал сознательно что бы строить кнопки и тд самому).
- Настройка: ESLint/Prettier, tsconfig (aliase), .env, .gitignore.
- CI (GitHub Actions): линт+typecheck+юнит.
- Первый деплой на Vercel.

<span style="color: #FF00FF">Реальность:</span> много времени уйдёт на вопросы про каждый конфиг и файл.

<span style="color: #FF00FF">Итог:</span> сайт открывается по URL, у тебя базовое понимание сборки и окружения.

---

MVP-1 и MVP-2 (фиксируем)

<span style="color: #00CED1">**MVP-1 (Free)**</span> — "продукт уже полезен"

<span style="color: #00CED1">Цель:</span> новости + базовая аналитика + аккаунт.

**News module (Free)**

- Лента из внешнего API (1–2 источника)
- Категории/теги, фильтры, сортировки
- Детальная новость
- Поиск (простая версия)
- AI-обработка минимально: summary + tags + флаг "AI-generated"
- Закладки/Read later

**Analytics module (Free)**

- /analytics hub:
  - insights/tips (от агентов)
  - 2–4 графика (AGI index + ещё 1–3 индекса/тренда)
- Источник данных сначала простой: агрегированные данные (JSON/DB)

**Account (Free)**

- Регистрация/логин
- Профиль (минимум)
- Настройки: подписка на дайджест (можно позже)

**Ограничения Free**

- лимит глубины аналитики/истории
- часть дашбордов как preview

---

<span style="color: #00CED1">**MVP-2 (Paid)**</span> — "помогаем бизнесам принимать решения"

<span style="color: #00CED1">Цель:</span> платная аналитика как roadmap по внедрению AI.

**Analytics Premium**

- Дашборды: отрасли/кейсы/вендоры/инструменты
- Сравнения + рекомендации (AI-generated reports)
- База кейсов (структура: отрасль → задача → инструмент → результат)
- Фильтры (отрасль/размер/задача/регион)
- Экспорт (PDF/CSV) итеративно

**Subscription & Billing**

- Планы (Monthly/Yearly)
- Paywall + доступ по ролям/плану
- Простая админка: контент/источники/планы

**Наблюдаемость и качество**

- метрики использования (без персональных данных)
- error monitoring

<span style="color: #FF00FF">Future (не в MVP-2):</span> локальный анализ на данных бизнеса.

---

План разработки и обучения (начиная с Этапа 2)

<span style="color: #FF00FF">Формат:</span> Цель → Что делаем → Tech/skills рынка → Артефакты → Критерий готовности

---

<span style="color: #00CED1">**Этап 2**</span> — UI Foundation + Design System (без shadcn)

<span style="color: #00CED1">Цель:</span> UI-слой, который масштабируется на 2 модуля и не превращается в хаос.

**Что делаем**

- Layout: Header/Nav + футер + базовая сетка страниц
- UI-компоненты как внутренний API: Button, Input, Select, Badge, Card, Tabs, Modal, Toast
- Страницы-заглушки: /news, /analytics, /account, /pricing
- Состояния UI: loading/empty/error/success

**Tech/skills рынка**

- React composition, типизация props, a11y, Tailwind patterns
- Основа дизайн-системного мышления (стандарты вместо "каждый раз по-новому")

**Артефакты (обязательные, v1 дизайн-системы)**

- components/ui/* + components/layout/*
- **Design Tokens**: CSS variables + Tailwind theme (цвета/типографика/spacing/radius/shadow)
- **design-system.md**: variants/sizes/states/a11y для каждого компонента
- **/ui каталог** (dev-only страница): все компоненты + все состояния

**Критерий готовности**

- новые страницы собираются из компонентов без изобретения стилей
- клавиатурная навигация и focus states в порядке

---

<span style="color: #00CED1">**Этап 3**</span> — Domain Model + Architecture Skeleton

<span style="color: #00CED1">Цель:</span> зафиксировать модель (News + Analytics + Account) и границы модулей, пока ещё не поздно.

**Что делаем**

- Доменные типы:
  - News: Article, Source, Tag, Category
  - Analytics: Metric, IndexSeries, Insight, ReportPreview
  - Account: User, Role, SubscriptionPlan
- Единый формат ошибок: ApiError + коды
- Принять соглашение: Result-тип или throw-policy (одно)
- Архитектура как схема (квадраты-стрелки):
  - C4 L1 (System Context): модули + внешние зависимости
  - 2–3 data flows: News fetch→cache→UI, Analytics metrics→storage→charts, Auth/session (минимум)
- Границы и запреты (v0): что является boundary (UI/BFF/External API/DB/Python) и что запрещено пересекать

**Tech/skills**

- TypeScript как инструмент проектирования
- Модульное мышление (границы ответственности)

**Артефакты**

- /domain/* (types + mappers)
- error-codes.md
- ARCHITECTURE.md (v0): модули + границы + C4 L1 + data flows (без "идеала", просто минимальный бронежилет)
- SYSTEM_DESIGN_DRILLS.md (v0): вопросы “как сделано в Narraive и почему” (для повторения и собеседований)

**Критерий готовности**

- типы покрывают MVP-1
- можешь объяснить архитектуру Narraive за 2–3 минуты и нарисовать схему “квадраты-стрелки”

---

<span style="color: #00CED1">**Этап 4**</span> — API Layer: ApiProcessor + Validation + Contract

<span style="color: #00CED1">Цель:</span> стабильная "труба данных" + зафиксированный контракт API.

**Что делаем**

- ApiProcessor:
  - fetch wrapper
  - timeout
  - retry с backoff (только безопасные запросы)
  - zod-валидация ответов
- Логирование запросов: duration/status/requestId
- BFF/прокси для внешних API (News/Analytics): ключи/секреты остаются на сервере, единая нормализация ответов
- Стратегия кэширования/лимитов (v1): что кэшируем на сервере vs ISR vs клиент, и как обрабатываем 429/rate limit
- Зафиксировать источники данных (v0) и ограничения (см. DATA_SOURCES.md)
- requestId/correlationId (v0): прокидываем через BFF → внешние API/DB → ответы/логи/ошибки
- Структурные логи (v0): route/status/duration/cacheHit/requestId (без PII)
- Observability v0 (после Этапа 4): Sentry + базовый error monitoring для ранних багов/регрессий

**Tech/skills**

- HTTP, error handling, надёжность
- подготовка к оплате: idempotency как концепт
- понимание rate limiting

**Артефакты**

- api/ApiProcessor.ts
- zod schemas для News/Analytics
- API_CONTRACT.md (v1): endpoints/DTO/ошибки/пагинация/фильтры + таблицы cache/rate-limit (важно: до того, как разрастутся сервисы)
- DATA_SOURCES.md (v0): 1–2 источника News/Analytics + ограничения (rate limit/лицензия/частота обновлений)
- OBSERVABILITY.md (v0): логирование/requestId + минимум метрик/алертов + что смотреть при ошибках

**Критерий готовности**

- каждый API-вызов → либо валидный data, либо предсказуемая ошибка
- API_CONTRACT.md отражает реальность кода
- по requestId можно найти цепочку запроса и понять: cacheHit/cold, внешнее API/DB, где задержка/ошибка

---

<span style="color: #00CED1">**Этап 5**</span> — News Module (MVP-1): лента/категории/детальная/поиск

<span style="color: #00CED1">Цель:</span> закрыть News часть MVP-1 end-to-end.

**Что делаем**

- /news (лента + фильтры)
- /news/category/[slug]
- /news/[id]
- Поиск (простая версия)
- SEO минимум на news-страницах
- E2E сценарии

**Tech/skills**

- Next routing, SSR/SSG/ISR по месту, error boundaries
- Testing pyramid: unit + integration + e2e

**Артефакты**

- NewsService + useNews (SWR можно оставить)
- e2e: "лента→новость→назад", "поиск→открыть"

**Критерий готовности**

- новости работают стабильно, ошибки отображаются корректно
- сценарий: “лента → открыть новость → поиск”
- latency (v0): `/api/news` p95 < 300ms на warm cache, p95 < 2000ms на cold (фиксируем по логам)

---

<span style="color: #00CED1">**Этап 6**</span> — Analytics Module (MVP-1 Free): Hub + графики + инсайты

<span style="color: #00CED1">Цель:</span> полезный бесплатный аналитический модуль (первый вау-эффект продукта).

**Что делаем**

- /analytics:
  - AGI index + 2–4 индекса/графика
  - карточки инсайтов/tips
- Выбрать одну библиотеку графиков и держаться её
- Кэширование/ISR для статичных метрик

**Tech/skills**

- Визуализация time series, UX дашбордов
- Работа с данными "как продукт" (понятность, источники, обновление)

**Артефакты**

- AnalyticsService
- components/analytics/*

**Критерий готовности**

- аналитика быстрая, графики читабельны, есть понятный источник данных
- сценарий: “analytics → графики читаемы → есть источник/дата обновления”
- каждый график показывает source + updatedAt, и это берётся из данных (не “вручную в UI”)
- latency (v0): `/api/analytics/series/*` p95 < 500ms на warm cache, p95 < 2000ms на cold (фиксируем по логам)

---

<span style="color: #00CED1">**Этап 8a**</span> — Auth Storage Foundation: Prisma + users/sessions

<span style="color: #00CED1">Цель:</span> поднять минимальную DB-основу под Accounts (auth + sessions) до реализации аккаунтов и закладок.

**Что делаем**

- Prisma + SQLite (с возможностью миграции на Postgres)
- Таблицы (минимум для аккаунта):
  - users
  - sessions
- Миграции: воспроизводимый старт "с нуля" (без ручных шагов)

**Tech/skills**

- Data modeling под auth, migrations, базовая безопасность

**Артефакты**

- schema.prisma (users/sessions) + первая миграция
- db-notes.md (v0): как поднять/сбросить DB локально, где миграции, как обновлять схему
- DB_MIGRATION.md (v0): стратегия роста SQLite → Postgres (когда/почему/как, риски, шаги)

**Критерий готовности**

- регистрация/логин могут опираться на DB, миграции применяются "с нуля" без ручных шагов

---

<span style="color: #00CED1">**Этап 7**</span> — Accounts (MVP-1): регистрация/кабинет/закладки/настройки

<span style="color: #00CED1">Цель:</span> сделать приложение, а не витрину.

**Что делаем**

- Auth: регистрация/логин (Auth.js/NextAuth или кастом)
- /account: профиль, закладки, настройки (минимум)
- Базовая авторизация (user/admin) — фундамент для админки

**Tech/skills**

- Auth vs Authorization, session/cookies, защита роутов, безопасность форм

**Артефакты**

- users/sessions (из Этапа 8a) + закладки: schema/хранение (DB)
- интеграционные тесты auth-флоу

**Критерий готовности**

- пользователь может войти и видеть свои данные (закладки/настройки)
- сценарий: “регистрация → закладка → список закладок”
- консистентность (v0): после refresh закладки не “пропадают”, состояние прогнозируемое
- latency (v0): auth endpoints p95 < 500ms (фиксируем по логам, без PII)

---

<span style="color: #00CED1">**Этап 8b**</span> — Storage & Caching: News/Analytics data, индексы + Data/Decisions Docs

<span style="color: #00CED1">Цель:</span> фундамент для роста и премиума, плюс "архитектурная память".

**Что делаем**

- Расширить Prisma schema (поверх users/sessions из Этапа 8a)
- Таблицы:
  - articles, sources, tags, article_tags
  - analytics_metrics / index_series / insights
  - subscriptions (заглушка ок)
- Индексы: publishedAt, slug/id, связи tag/category
- Кэш: in-memory/ISR (+ Redis позже опционально)

**Tech/skills**

- Data modeling, migrations, индексы, consistency, cache invalidation

**Артефакты**

- schema.prisma (расширение: News/Analytics + индексы)
- db-notes.md
- DATA_MODEL.md (v1): сущности/связи/индексы/статусы raw→processed
- DECISIONS.md (v1): 3–5 ADR-решений (кэш/ISR/DB/AI слой/монолитность)

**Критерий готовности**

- данные устойчивы, запросы быстрые, миграции воспроизводимы
- DATA_MODEL/DECISIONS соответствуют коду
- можешь объяснить DATA_MODEL.md и показать, где в БД отражены статусы raw→processed и подписки

---

<span style="color: #00CED1">**Этап 9**</span> — AI Pipeline v1 (News): фильтрация/саммари/теги через Python

<span style="color: #00CED1">Цель:</span> AI-first усиление без "сломали всё ради агентов".

**Что делаем**

- Python модуль:
  - получает сырой текст/метаданные
  - возвращает summary/tags/clean title (опционально)
- Асинхронность:
  - сырьё можно показать сразу
  - обработанное приходит позже (raw→processed)
- Результаты сохраняются в DB
- Надёжность/семантика (v0):
  - at-least-once обработка + идемпотентность (повтор не создаёт дублей)
  - state machine статусов: raw → processing → processed | failed (с retry)

**Tech/skills**

- ETL, фоновые задачи, очередь/крон минимально, наблюдаемость пайплайна

**Артефакты**

- python/processor/*
- JSON schema протокола обмена
- AI_PIPELINE_PROTOCOL.md (v0): контракт Next↔Python (request/response + ошибки + идемпотентность)

**Критерий готовности**

- обработка автономна, сбои не роняют продукт, статусы прозрачны
- повторная обработка одного и того же входа не ломает данные и не создаёт дублей

---

<span style="color: #00CED1">**Этап 10**</span> — Monetization (MVP-2): подписка, paywall, планы

<span style="color: #00CED1">Цель:</span> включить платную аналитику и доступ по планам.

**Что делаем**

- /pricing + планы
- платежи (Stripe или аналог)
- paywall на premium-дашборды
- роли/права доступа
- админ-минимум (управление доступом/планами)
- Webhooks (v0): подпись, дедупликация событий, идемпотентные апдейты подписки, повторные события не ломают состояние

**Tech/skills**

- idempotency для платежей, webhooks, безопасность

**Артефакты**

- billing module + webhook handlers
- e2e "оплатил→получил доступ"

**Критерий готовности**

- платежи устойчивы (повторные webhooks не ломают состояние), доступ корректный
- webhooks (v0): подпись проверяется, события дедуплицируются (eventId), апдейты подписки идемпотентны

---

<span style="color: #00CED1">**Этап 11**</span> — Premium Analytics (MVP-2): бизнес-дашборды + кейсы

<span style="color: #00CED1">Цель:</span> ценность для бизнеса (roadmap внедрения AI).

**Что делаем**

- premium dashboards: отрасли/кейсы/инструменты/вендоры
- AI-generated reports (лимитировано по объёму, чтобы держать качество)
- экспорт (CSV/PDF) итеративно
- улучшенный поиск/фильтры по аналитике

**Tech/skills**

- B2B UX, продуктовая аналитика, проверяемость источников

**Артефакты**

- reports model + генерация
- структура case-studies

**Критерий готовности**

- premium отвечает на "что делать бизнесу" и удобно фильтруется/экспортируется

---

<span style="color: #00CED1">**Этап 12**</span> — Production-grade: Observability, Security, CI/CD, Docker + финальные доки

<span style="color: #00CED1">Цель:</span> прод-качество, чтобы не стыдно продавать и поддерживать.

**Что делаем**

- Sentry + structured logs
- rate limiting на публичные API и формы
- **Security Hardening:**
  - CSRF защита: токены + SameSite cookies (Strict/Lax)
  - XSS защита: CSP headers + санитизация пользовательского ввода
  - CORS: white-list доменов (credentials: true только для фронта)
  - HttpOnly + Secure флаги для auth cookies
- **Caching Strategy (финализация):**
  - Browser cache: Cache-Control headers для статики (js/css/images)
  - CDN настройка для глобальной раздачи (если используется)
  - Redis для session storage + hot data (если внедрён)
  - TTL + инвалидация: документировать правила и стратегию
- CI/CD: unit+integration+e2e в PR, coverage
- Docker (reproducible run) + документация
- SEO/a11y финальная полировка, Lighthouse цели

**Tech/skills**

- эксплуатация, релизный цикл, наблюдаемость
- Web Security: XSS, CSRF, CORS, cookie security (HttpOnly/Secure/SameSite)
- Caching: browser cache headers, CDN, Redis, TTL/invalidation strategies

**Артефакты (финализация)**

- финальная версия ARCHITECTURE.md, API_CONTRACT.md, DATA_MODEL.md, DECISIONS.md
- SECURITY.md: XSS/CSRF/CORS настройки + cookie политика + rate limits + checklist
- CACHING_STRATEGY.md: что кэшируем, где, TTL, правила инвалидации (browser/CDN/Redis)
- RUNBOOK.md: как дебажить 500, где смотреть логи, как проверять webhooks, как откатываться
- Dockerfile + docker-compose

**Критерий готовности**

- проект разворачивается "с нуля по доке"
- ошибки и деградации ловятся, релизы предсказуемы
- security checklist выполнен: CSRF/XSS/CORS настроены, auth cookies защищены
- кэширование работает: статика отдаётся с правильными headers, hot data в Redis (если внедрён)

---

**Важное правило "уложиться до года"**

Последовательность остаётся железной:

1. ценность без AI (News + Free Analytics + Account)
2. AI как усилитель (pipeline v1)
3. монетизация (paywall + premium)
4. углубление аналитики

И отдельно — принцип бронежилета:
минимальные, но обязательные артефакты на каждом ключевом переходе (Этап 2, 3–4, 8, 12). Это не бюрократия — это защита от переделок.
