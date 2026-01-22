AI Pipeline Protocol (v0) — Next ↔ Python

---

<span style="color: #00CED1">**Цель:**</span> фиксируем контракт обмена и правила надёжности (валидация, идемпотентность, статусы), чтобы не было “undefined madness”.

---

## Semantics (v0)

- **Delivery**: at-least-once (сообщение/задача может прийти повторно).
- **Idempotency**: повтор одного и того же входа не должен создавать дублей и не должен ломать состояние.
- **State machine**: `raw → processing → processed | failed` (+ retry policy).

---

## Identifiers

- `jobId`: уникальный id задачи (uuid или стабильный ключ).
- `inputKey`: ключ идемпотентности (например, `source + externalId` или `url + publishedAt`).

Правило: если приходит задача с тем же `inputKey`, система:

- либо возвращает уже готовый результат
- либо говорит “уже в processing”
- либо повторяет обработку безопасно (без дублей)

---

## Request (Next → Python)

Минимальные поля (v0):

- `jobId`
- `inputKey`
- `source`
- `externalId` (если есть)
- `url`
- `title`
- `content` (сырой текст)
- `language` (optional)
- `fetchedAt`
- `metadata` (optional)

Валидация:

- Next/BFF: zod на входе/выходе
- Python: pydantic на входе/выходе

---

## Response (Python → Next)

Минимальные поля (v0):

- `jobId`
- `inputKey`
- `status`: `processed | failed`
- `summary` (если processed)
- `tags` (если processed)
- `isAiGenerated` (если processed)
- `error` (если failed): `{ code, message, details? }`

---

## Failure handling

- Таймаут/ошибка Python не роняют продукт:
  - UI может показывать raw
  - обработка догоняет позже
- При ошибке:
  - сохраняем статус `failed`
  - логируем `requestId/jobId/inputKey`
  - retry policy: ограниченно и с backoff

