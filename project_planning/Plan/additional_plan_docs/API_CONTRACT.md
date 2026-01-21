API Contract (v1)

---

<span style="color: #00CED1">**Цель:**</span> чтобы “невалидные данные не проходили”, а поведение API было предсказуемым (ошибки, пагинация, кэш, лимиты).

---

## Conventions (v1)

### RequestId / CorrelationId

- Каждый запрос получает `requestId`.
- `requestId` прокидывается в:
  - логи (BFF)
  - ответы API
  - ошибки (`ApiError`)
  - Sentry

### Response shape

**Success**

- `200/201`
- `data`: payload
- `requestId`: строка

**Error**

- `4xx/5xx`
- `error`: объект `ApiError`
- `requestId`: строка

### ApiError (единый формат)

- `code` (string): машинный код ошибки
- `message` (string): кратко для человека
- `details` (optional): структурные детали (например, поля валидации)
- `requestId` (string)

Примеры кодов:

- `VALIDATION_ERROR`
- `UPSTREAM_ERROR`
- `RATE_LIMITED`
- `UNAUTHORIZED`
- `FORBIDDEN`
- `NOT_FOUND`
- `INTERNAL_ERROR`

---

## Endpoints (черновик v1)

### News (BFF)

- `GET /api/news`
  - query: `q`, `category`, `tag`, `sort`, `page`, `pageSize`
- `GET /api/news/:id`
- `GET /api/news/sources`

### Analytics (BFF)

- `GET /api/analytics/series/:metricId`
  - query: `range`, `granularity`
- `GET /api/analytics/insights`

### Account

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/account/me`
- `GET /api/account/bookmarks`
- `POST /api/account/bookmarks`
- `DELETE /api/account/bookmarks/:id`

### Billing (MVP-2)

- `POST /api/billing/checkout`
- `POST /api/billing/webhook`
- `GET /api/billing/subscription`

---

## Caching strategy (таблица v0 → v1)

| Endpoint | Cache layer | TTL (v0) | Invalidation | Notes |
|---|---:|---:|---|---|
| `GET /api/news` | server cache | 5–15m | TTL only | cold: зовём источники, warm: отдаём кэш |
| `GET /api/news/:id` | server cache | 30–120m | TTL only | можно кэшировать агрессивнее, так как детальная меняется редко |
| `GET /api/analytics/series/:metricId` | DB/ISR | 24h | scheduled refresh | UI обязан показывать `source` + `updatedAt` |
| `GET /api/account/me` | no cache | 0 | n/a | персональные данные |
| `GET /api/account/bookmarks` | no cache | 0 | n/a | персональные данные |

---

## Rate limiting (v0 → v1)

| Route group | Limit (v0) | Key | On exceed |
|---|---:|---|---|
| Public read (news, analytics) | 60 req/min | IP | `429` + `Retry-After`, backoff |
| Auth endpoints | 10 req/min | IP | `429`, soft lock (v1) |
| Login | 5 req/min | IP + identifier | `429`, add delay, no user enumeration |
| Webhook endpoint | n/a | signature verified | always idempotent + dedup |

---

## Failure modes (v0)

- **Upstream timeout**: ограничиваем `timeout`, возвращаем `UPSTREAM_ERROR`.
- **Retry**: только safe запросы; exponential backoff.
- **429**: obey `Retry-After`, уменьшаем частоту, логируем события.
- **Degradation**: при падении источника возвращаем частичный результат/сообщение (если возможно).

