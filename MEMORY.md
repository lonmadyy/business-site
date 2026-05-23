# MEMORY.md

Журнал инженерных решений и подводных камней по проекту. Новые записи — сверху. Формат и правила ведения описаны в [CLAUDE.md](CLAUDE.md) (раздел «Ведение MEMORY.md»).

---

## 2026-05-24 — Сменили Telegram-username, основной CTA теперь ведёт на /contacts/

- Telegram-username: `botfactoryby` → `minsksite` (везде, кроме email-адреса — он остаётся `botfactoryby@gmail.com`). Источник правды — `_data/site.js → telegram`; всё ещё есть 4 хардкодных URL в Final CTA блоке `index.njk` (там пришлось правил руками).
- CTA «Обсудить проект» (header / mobile-menu / hero default) переименован в «Связаться с нами» и теперь ведёт на новую страницу `/contacts/`, а не на Telegram напрямую. Мотивация — собрать все каналы связи в одно место.
- Final CTA блок на главной (`#contact`) намеренно оставлен с прямыми кнопками Telegram/email/phone — там кнопки называются иначе («Получить концепт» / «Узнать»), и они работают как короткий путь без перехода на /contacts/.

## 2026-05-23 — Выбран production-домен: business-site.by

Заглушку `https://example.com` заменили на `https://business-site.by`. Изменилось одно поле `domain` в `src/_data/site.js` + хардкодные URL в `src/static/llms.txt` и `src/static/robots.txt` (там не шаблон). Всё canonical / OG / sitemap / JSON-LD автоматически подтянулось.

**Замечание про SEO:** домен — exact-match (буквальный перевод «бизнес-сайт»). Google такие EMD без сильного контента иногда понижает. На старте не страшно; держать в уме при SEO-стратегии.

## 2026-05-14 — Запуск Eleventy dev-сервера из Claude Code на Windows с пробелом в пути

Проект лежит в `C:\Users\Yegor\Documents\New project 3\…`. Пробел в `New project 3` ломает `runtimeExecutable` в `preview_start` (Claude Preview MCP) — путь обрезается по первому пробелу, и команда не находится.

**Решение для `.claude/launch.json`:** использовать 8.3-короткие имена и вызывать локальный бинарь напрямую, а не `npx`:

```json
"runtimeExecutable": "C:\\Users\\Yegor\\DOCUME~1\\NEWPRO~3\\CLAUDE~1\\WORKTR~1\\<wt>\\node_modules\\.bin\\eleventy.cmd"
```

Короткие имена получать через `Scripting.FileSystemObject.GetFolder(...).ShortPath`.

**Почему не `npx @11ty/eleventy`:** npx тянет глобальный Eleventy 3.x (последний), а в проекте `^2.0.1` — 3.x ломает совместимость шаблонов.

**Конфликты портов.** Порты 8765 и 8766 могут быть заняты системными процессами без читаемого `CommandLine` (`taskkill` тоже не отрабатывает по таймауту) — взять любой свободный, например 8770.
