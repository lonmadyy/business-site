# MEMORY.md

Журнал инженерных решений и подводных камней по проекту. Новые записи — сверху. Формат и правила ведения описаны в [CLAUDE.md](CLAUDE.md) (раздел «Ведение MEMORY.md»).

---

## 2026-05-24 — Деплой: GitHub + Vercel + business-site.by

**GitHub:** `https://github.com/lonmadyy/business-site` (public, owner `lonmadyy`). Push'ил из основного репозитория (`C:\Users\Yegor\Documents\New project 3`), сначала fast-forward merge `claude/jovial-merkle-111e0a` → `master` (33 коммита).

**Vercel:**
- Team: `yegor's projects` (slug `yegors-projects-e385447e`, Hobby plan)
- Project: `business-site` (auto-detected Eleventy framework)
- Production URL: `business-site-ruby.vercel.app`
- Custom domains: `business-site.by` (apex) + `www.business-site.by` (с 307 redirect apex → www)
- Auto-deploy: на каждый push в `master`

**DNS (через domain.by → «DNS-редактор»):**
- `business-site.by.` **A** → `216.198.79.1` (TTL 3600)
- `www.business-site.by.` **CNAME** → `437fd82dd5302c33.vercel-dns-017.com.` (TTL 3600)

NS-серверы домена при включении DNS-редактора автоматически переключились на `a1.domain.by`, `a2.domain.by`. DS/DNSSEC были стёрты.

**Подводный камень domain.by:** в форме «Добавить запись»:
- Поле «имя» для apex оставлять **пустым** (синтаксис `@` валидатор отвергает)
- TTL обязателен — без него запись не сохраняется
- Type dropdown — native `<select>`; чтобы выбрать через automation, click + keyboard letter (`a` → A, `c` → CNAME) + Enter, иначе value-attribute меняется но change-event не триггерится

**Что осталось:**
- SSL для Vercel выпустится сам (Let's Encrypt, ~30-60 сек после полной propagation в публичных DNS)
- GlobalSign SSL-сертификат от domain.by — отдельная история, для него нужно прописать TXT `_globalsign-domain-verification` = `kCVVFScxerLNgydl520bxTqcTTZayNo1jxc5EIFp28`. На Vercel этот SSL не нужен (там свой Let's Encrypt), но если cert куплен и хочется чтобы был выпущен — добавить можно
- GA4 Key Events разметить после первого реального трафика
- Verification-меты Google Search Console и Я.Вебмастер — для будущего SEO-мониторинга

## 2026-05-24 — Аналитика: Yandex.Metrika 109388514, GA4 G-ZQZMG72QGD

Поставили оба счётчика, оба активны на всех страницах через `partials/analytics.njk`. Yandex включён с webvisor + clickmap + ecommerce(dataLayer) + accurateTrackBounce + trackLinks. GA4 — с `anonymize_ip: true`. IDs хранятся в `_data/site.js → site.analytics`.

**Custom event tracking** (один delegated click listener, шлёт в обе системы):

| Событие (event/goal name) | Триггер |
|---|---|
| `telegram_click` | клик на любой `a[href^="https://t.me/"]` |
| `email_click` | клик на любой `a[href^="mailto:"]` |
| `phone_click` | клик на любой `a[href^="tel:"]` |
| `cta_contacts_click` | клик на header-cta или primary CTA в hero, ведущий на `/contacts/`. Параметр `location: header\|hero` |
| `service_click` | клик на `.service-row` (главная). Параметр `service: <название>` |

**Цели в Yandex.Metrika** (привязаны к событиям выше):

| # | Название | ID | Тип |
|---|---|---|---|
| 1 | Визит страницы /contacts/ | 562207954 | URL содержит |
| 2 | Click — Telegram | 562208008 | JS-событие `telegram_click` |
| 3 | Click — Email | 562208015 | JS-событие `email_click` |
| 4 | Click — Phone | 562208064 | JS-событие `phone_click` |
| 5 | Click — CTA «Связаться» | 562208098 | JS-событие `cta_contacts_click` |
| 6 | Click — Строка услуги | 562208131 | JS-событие `service_click` |

**TODO для GA4:** конверсии (Key Events) в GA4 размечаются **после** того, как событие хоть раз произошло — события появляются в `Admin → Events` через 24-48 ч. После публикации сайта и первых кликов нужно зайти в GA4 и пометить `telegram_click`, `email_click`, `phone_click`, `cta_contacts_click` как Key Events.

**TODO для исключения собственного трафика:** в Y.Metrika `Настройки → Фильтры` добавить свой IP, в GA4 `Admin → Data filters` тоже. Иначе свои визиты будут засорять данные. Нужен фиксированный IP — обычно домашний/офисный + динамический по cookie через UTM.

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
