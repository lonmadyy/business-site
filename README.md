# Bot Factory — сайт студии

Сайт студии **Bot Factory** (Минск, Беларусь). Делаем сайты, Telegram-боты, Mini Apps и AI-интеграции под ключ. Проект — статика, собираемая через Eleventy: одна главная и 4 отдельные посадочные под каждую услугу.

## Кратко

- **Тип:** статический сайт, собирается из шаблонов через Eleventy 2.x. На выходе — обычный HTML.
- **Стек:** HTML5 + CSS3 + ванильный JavaScript (ES2020+). Шаблоны — Nunjucks.
- **Анимации скролла:** [Lenis 1.0.42](https://github.com/darkroomengineering/lenis) — лежит локально в `src/static/assets/vendor/`, без CDN.
- **Шрифты:** Google Fonts — `Manrope` (основной) и `JetBrains Mono` (моно/лейблы).
- **Язык интерфейса:** русский (`<html lang="ru">`).
- **Целевая аудитория:** бизнес в Беларуси (Минск).

## Страницы

| URL | Назначение |
|---|---|
| `/` | Главная: общий оффер, 4 услуги, цены с табами, FAQ |
| `/sites/` | Лендинг услуги «Сайты под ключ» |
| `/telegram-bots/` | Лендинг услуги «Telegram-боты» |
| `/mini-apps/` | Лендинг услуги «Telegram Mini Apps» |
| `/ai/` | Лендинг услуги «AI-интеграции» |

## Структура репозитория

```
.
├── .eleventy.js              # Конфиг Eleventy
├── package.json              # npm-скрипты dev / build / clean
├── README.md                 # Этот файл
├── CLAUDE.md                 # Рабочие правила для Claude
├── AGENTS.md                 # Правила для AI-агентов
└── src/
    ├── _data/
    │   ├── site.js                # site-wide значения (бренд, контакты, домен, версии)
    │   └── services.js            # 4 услуги — копи, цены, FAQ, технологии
    ├── _includes/
    │   ├── layouts/
    │   │   ├── base.njk           # html/head/body-каркас
    │   │   └── service.njk        # extends base; рендерит страницу услуги из services[id]
    │   └── partials/
    │       ├── head-meta.njk
    │       ├── header.njk
    │       ├── mobile-menu.njk
    │       ├── preloader.njk
    │       ├── footer.njk
    │       ├── scripts.njk
    │       ├── hero-terminal.njk
    │       ├── pricing-cards.njk  # 3 карточки без табов (для услуг)
    │       ├── timeline.njk
    │       ├── integrations.njk
    │       ├── guarantees.njk
    │       ├── final-cta.njk
    │       └── faq.njk
    ├── index.njk             # главная (extends base)
    ├── sites.njk             # /sites/
    ├── telegram-bots.njk     # /telegram-bots/
    ├── mini-apps.njk         # /mini-apps/
    ├── ai.njk                # /ai/
    ├── sitemap.njk           # генерация /sitemap.xml из collections.all
    └── static/               # passthrough copy в _site/
        ├── styles.css
        ├── script.js
        ├── robots.txt
        ├── llms.txt
        └── assets/
            ├── favicon.svg
            ├── og-image.png
            ├── mockup-crm.svg     # пока не используется (см. TODO)
            ├── mockup-pravobot.svg
            └── vendor/
                └── lenis-1.0.42.min.js
```

## Запуск локально

```bash
npm install        # один раз
npm run dev        # dev-сервер с live reload на http://localhost:8765
npm run build      # сборка в _site/
npm run clean      # удалить _site/
```

Деплоим содержимое `_site/` на любой статический хостинг (Vercel / Netlify / Cloudflare / S3 / nginx). Если хостинг не поддерживает «папка → index.html» по умолчанию, проверьте, что URL вида `/sites/` корректно отдаёт `/sites/index.html`.

## Секции главной

1. **Прелоадер** — анимированный «робот» + полоса прогресса.
2. **Шапка** — логотип, десктопная навигация (`#services`, `#process`, `#contact`), CTA «Обсудить проект», бургер-меню.
3. **Hero** — терминал-блок с морфингом фразы.
4. **Proof** — три карточки: НПД и УНП, договор и гарантия, концепт до оплаты.
5. **Услуги (`#services`)** — 4 строки с превью справа; превью содержит ссылку «Подробнее →» на соответствующую страницу услуги.
6. **Offer** — бесплатный концепт за 48 часов.
7. **Интеграции** — две бегущие строки.
8. **Процесс (`#process`)** — таймлайн из 5 шагов.
9. **Цены (`#pricing`)** — табы (Сайты / Telegram-боты / AI / интеграции), три тарифа в каждом.
10. **Гарантии** — 4 плитки.
11. **Final CTA (`#contact`)** — кнопки в Telegram, email, телефон.
12. **FAQ** — `<details>`-аккордеон, 8 вопросов.
13. **Подвал** — контакты, ссылки на услуги (реальные `/sites/`, `/telegram-bots/` и т. д.), соцсети.

## Секции страницы услуги

1. **Шапка** (общий partial)
2. **Hero-терминал** — путь `botfactory://services/<slug>`, свой триплет морф-фраз, ссылки на Telegram и `#pricing`.
3. **USP-блок** — 3 карточки в стиле proof («Кому подходит», «Какие задачи решает», «Что получите») + tech-чипы под чертой.
4. **Цены** — 3 тарифа без табов.
5. **Процесс** — 5 шагов (общие).
6. **Интеграции** — две marquee-строки, релевантные услуге.
7. **Гарантии** — общие 4 плитки.
8. **Final CTA** — page-specific формулировка.
9. **FAQ** — 8 вопросов, специфичных для услуги.
10. **Подвал** (общий partial). В блоке «Услуги» текущая страница помечена `aria-current="page"` — лаймовый цвет.

## Поведение JS ([src/static/script.js](src/static/script.js))

- **Прелоадер.** Прогресс инкрементируется по таймеру; уважает `prefers-reduced-motion`.
- **Lenis.** Включается, только если `window.Lenis` загрузился и пользователь не запросил уменьшение анимаций.
- **Плавный скролл по якорям.** Работает с любым `a[href^="#"]`, обновляет `history`. Hash в URL → докрутка после загрузки.
- **Шапка.** Класс `is-scrolled` при `scrollY > 100`.
- **Мобильное меню.** Управляет `inert`, `aria-hidden`, `aria-expanded`, ловит `Escape`, возвращает фокус.
- **Hero-морфинг.** WAAPI каждые 2.6 с. Фразы читаются из `data-morph-phrases` на `[data-morph]` (JSON-массив); если атрибута нет — fallback к хардкоду в `script.js`.
- **`IntersectionObserver`.** На `.section-reveal` навешивает `is-visible`.
- **Услуги (только на главной).** Превью справа перерисовывается на `mouseenter` / `focus` / `click`, ссылка «Подробнее →» обновляется по `serviceContent[i].href`.
- **Цены (только на главной).** Табы поддерживают клавиатуру (стрелки, Home/End, Enter/Space), `aria-selected`, `aria-controls`.
- **Кастомный курсор.** Точка + кольцо с лагом. Скрыт на `(max-width: 980px)`.
- **Defensive null-checks.** Service- и pricing-блоки не существуют на страницах услуг — соответствующие инициализаторы (`forEach` по пустым `NodeList`-ам) безопасно ничего не делают. Морф обёрнут в `if (morphTarget)`.

## SEO

- **Мета-теги** на каждой странице: `description`, `theme-color`, `canonical`, OpenGraph, Twitter Card. Шаблонизирует `partials/head-meta.njk` из значений на странице (frontmatter) и из `site.js`.
- **JSON-LD:**
  - Главная: `ProfessionalService` (со списком 4 `Offer`, `priceSpecification`, `priceRange`, `areaServed`) и отдельный `FAQPage`.
  - `/<service>/`: `@graph` с `Service` (3 `Offer` со ставками BYN), `BreadcrumbList` (Главная → услуга), `FAQPage` (вопросы услуги).
- **`sitemap.xml`** генерируется из `collections.all` Eleventy. 5 URL: главная (priority 1.0) + 4 услуги (0.8). Lastmod = дата сборки.
- **`robots.txt`** и **`llms.txt`** пробрасываются как passthrough из `src/static/`.
- **TODO (см. Deferred):** все абсолютные URL ссылаются на `https://example.com/` — заглушка. После решения по реальному домену меняется в одном месте: `src/_data/site.js → domain`.

## Кеш-бастинг

`styles.css` и `script.js` подключаются с query-версией:

```html
<link rel="stylesheet" href="/styles.css?v={{ site.cssVersion }}" />
<script src="/script.js?v={{ site.jsVersion }}"></script>
```

Версии живут в [src/_data/site.js](src/_data/site.js) — `cssVersion`, `jsVersion`. При значимых правках CSS/JS — инкремент в одном месте, шаблонизатор раскидает по всем страницам.

## Доступность

- `prefers-reduced-motion` уважается: прелоадер ускоряется, плавный скролл и Lenis отключаются.
- Мобильное меню корректно работает с фокусом и `inert`, фон `var(--bg)` (без просвечивания hero).
- Табы цен — `role="tablist"` с управлением `tabindex` и стрелками.
- FAQ — нативные `<details>` (работают без JS).
- Видимый `:focus-visible` outline на всех интерактивах (`:where(button, a, summary, [tabindex])`).

## Как добавить ещё одну услугу

1. **Добавить запись в [src/_data/services.js](src/_data/services.js).** Скопировать существующий блок (например, `ai`), сменить `id`, `slug`, `permalink`, `navName`, `breadcrumbName`, `pageTitle`, `pageDescription`, `serviceType`, `hero` (terminalPath, h1Lines, morphPhrases, sideBlurb), `usp.cards`, `tech.items`, `pricing.plans`, `integrations.row1/row2`, `faq`, `finalCta`.
2. **Создать `src/<slug>.njk`.** Минимальная frontmatter — `permalink: /<slug>/index.html`, `serviceId: <slug>`, плюс title/description/ogTitle/ogDescription/canonicalPath. Ниже — `{% extends "layouts/service.njk" %}`. Всё.
3. **Перебилдить.** `npm run build`. Sitemap, footer-навигация и cross-link на главной (если запись добавлена в `services` JS-объект) подтянутся автоматически.
4. **Согласовать копи и цены** перед деплоем.

## Как обновить копирайт или цены

Все тексты страниц услуг — в [src/_data/services.js](src/_data/services.js): hero-блёрб, USP-карточки, описания тарифов, FAQ, формулировки финального CTA. Тексты главной — частично в [src/index.njk](src/index.njk) (FAQ, hero-фразы), частично — в значениях по умолчанию в partials (`timeline.njk`, `guarantees.njk`).

## Deferred / TODO

- **D1.** Заменить `https://example.com/` на реальный домен в [src/_data/site.js](src/_data/site.js) (`domain`). Это перепишет canonical / OG / sitemap / JSON-LD во всех страницах.
- **D2.** Поставить Yandex.Metrica и/или GA4 (через partials/head-meta или отдельный partial). Зависит от решения по cookies / юр-вопросов.
- **D3.** Verification-метатеги Google Search Console и Yandex.Webmaster.
- **D4.** Реальные ссылки Instagram и LinkedIn в footer (сейчас `href="#"` — заглушки).
- **D5.** Блок кейсов / портфолио на сайте.
- **D6.** Lead-форма как альтернативный канал к Telegram CTA.
- **D7.** Блог `/blog/` (под Eleventy `collections` готов).
- **D8.** Удалить или начать использовать `assets/mockup-*.svg` — сейчас лежат, но никем не подключены.

## Контакты студии

- Telegram: <https://t.me/botfactoryby>
- Email: <botfactoryby@gmail.com>
- Телефон: +375 44 541 48 68
- Реквизиты: НПД, УНП HE7170411, Шевелёв Е. В.

## Лицензия

Коммерческий проект. Контент и оформление принадлежат Bot Factory.
