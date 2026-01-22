Observability (v0)

---

<span style="color: #00CED1">**Цель:**</span> быстро отвечать на вопросы “что сломалось?”, “почему медленно?”, “у кого именно?”, не трогая приватные данные.

---

## requestId / correlationId

- Каждый входящий запрос получает `requestId`.
- `requestId` должен быть:
  - в структурных логах
  - в `ApiError`
  - в ответах BFF
  - в Sentry events

---

## Structured logs (v0)

**Принцип:** логируем факты, а не “текст на глаз”.

Рекомендуемые поля:

- `timestamp`
- `level`
- `env` (dev/stage/prod)
- `requestId`
- `route`
- `method`
- `status`
- `durationMs`
- `cacheHit` (boolean)
- `upstream` (optional: hn/rss/wikimedia/arxiv/stripe)
- `errorCode` (optional)

**Запреты**

- Не логировать: пароли/токены/куки/ключи источников/полный текст приватных данных.

---

## Sentry (v0)

- UI: capture exceptions + performance traces (опционально)
- Server/BFF: capture exceptions + attach `requestId`
- Tagging:
  - `module` (news/analytics/account/billing/ai)
  - `route`
  - `upstream` (если есть)

---

## Minimal metrics (v0)

- **Latency**: p50/p95/p99 по ключевым роутам (news list, analytics series, login).
- **Error rate**: % ошибок по модулю и по upstream.
- **Upstream health**: количество 429/timeouts.
- **Cache effectiveness**: cacheHit ratio.

---

## “Что делать при 500” (ссылка на runbook)

- Полный runbook оформляется в `RUNBOOK.md` (Этап 12).
- До него: минимум — быстрые шаги:
  - найти `requestId` из ответа/лога
  - открыть Sentry event по `requestId`
  - посмотреть `upstream`/`durationMs`/`status`/`errorCode`

