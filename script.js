const header = document.querySelector("[data-header]");
const preloader = document.querySelector(".preloader");
const preloaderBar = document.querySelector("[data-preloader-bar]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const morphTarget = document.querySelector("[data-morph]");
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const serviceRows = [...document.querySelectorAll("[data-service]")];
const servicePreview = document.querySelector("[data-service-preview]");
const pricingTabs = [...document.querySelectorAll("[data-pricing-tab]")];
const planCards = [...document.querySelectorAll("[data-plan-card]")];
const pricingNote = document.querySelector("[data-pricing-note]");

const serviceContent = [
  {
    title: "Сайты, которые продают без лишнего шума",
    body: "Лендинги, корпоративные сайты и продуктовые страницы с быстрым запуском, SEO-базой и аккуратной аналитикой.",
    tags: ["Next.js", "React", "SEO"],
  },
  {
    title: "Боты, которые берут рутину на себя",
    body: "Telegram-боты для заявок, оплат, уведомлений, личных кабинетов и внутренних процессов без лишнего интерфейса.",
    tags: ["Python", "aiogram", "Payments"],
  },
  {
    title: "Mini Apps внутри Telegram",
    body: "Лёгкие приложения с привычным UX, каталогами, бронированиями, кабинетами и подключением к вашей системе.",
    tags: ["TWA", "WebGL", "API"],
  },
  {
    title: "AI-интеграции под бизнес-задачу",
    body: "RAG-поиск, ассистенты, обработка обращений, генерация документов и связка с CRM или базой знаний.",
    tags: ["GPT", "LLM", "RAG"],
  },
];

const pricingContent = {
  sites: {
    note: "Три варианта для сайтов: от быстрого лендинга до продукта с кабинетом.",
    plans: [
      {
        badge: "[ старт ]",
        title: "Лендинг",
        price: "от 690 BYN",
        description: "Одна сильная страница для заявки, рекламы или проверки идеи.",
        includes: ["Структура и тексты", "Адаптивная верстка", "Базовая аналитика"],
      },
      {
        badge: "[ оптимал ]",
        title: "Корпоративный сайт",
        price: "от 1 490 BYN",
        description: "Сайт под услуги, доверие и стабильный поток обращений.",
        includes: ["До 6 смысловых блоков", "SEO-база и скорость", "Контакты и цели"],
      },
      {
        badge: "[ максимум ]",
        title: "Сайт + кабинет",
        price: "от 2 490 BYN",
        description: "Проект со сложной логикой, личным кабинетом или интеграциями.",
        includes: ["Фронтенд + backend", "Интеграции с API", "Подготовка к росту"],
      },
    ],
  },
  bots: {
    note: "Три варианта для Telegram-ботов: от простого сценария до автоматизации процесса.",
    plans: [
      {
        badge: "[ старт ]",
        title: "Бот-заявка",
        price: "от 690 BYN",
        description: "Бот принимает обращения, задаёт вопросы и отправляет заявки вам.",
        includes: ["Сценарий диалога", "Уведомления в Telegram", "Админ-настройки"],
      },
      {
        badge: "[ оптимал ]",
        title: "Бот с логикой",
        price: "от 1 490 BYN",
        description: "Личный кабинет, статусы, простые оплаты или связка с таблицами.",
        includes: ["Пользовательские роли", "Интеграция с Sheets/API", "История обращений"],
      },
      {
        badge: "[ максимум ]",
        title: "Бот-платформа",
        price: "от 2 490 BYN",
        description: "Сложная автоматизация с CRM, оплатами, базой данных и поддержкой.",
        includes: ["Backend и база данных", "CRM / платежи / webhooks", "Мониторинг запуска"],
      },
    ],
  },
  systems: {
    note: "Для AI, Mini Apps и интеграций — понятные пакеты от пилота до полного контура.",
    plans: [
      {
        badge: "[ старт ]",
        title: "AI-пилот",
        price: "от 790 BYN",
        description: "Проверяем гипотезу: ассистент, обработка текста или простая интеграция.",
        includes: ["Короткий сценарий", "Подключение API", "Демо на ваших данных"],
      },
      {
        badge: "[ оптимал ]",
        title: "Интеграция",
        price: "от 1 690 BYN",
        description: "Связываем CRM, Telegram, таблицы, платежи или внешние сервисы.",
        includes: ["Карта процесса", "REST API / webhooks", "Логи и контроль ошибок"],
      },
      {
        badge: "[ максимум ]",
        title: "AI + Mini App",
        price: "от 2 900 BYN",
        description: "Полноценный интерфейс, AI-логика, хранение данных и бизнес-автоматизация.",
        includes: ["Mini App интерфейс", "RAG / база знаний", "Поддержка после запуска"],
      },
    ],
  },
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let preloaderValue = 0;
const preloadTimer = window.setInterval(() => {
  preloaderValue = Math.min(100, preloaderValue + (prefersReducedMotion ? 34 : Math.ceil(Math.random() * 9)));
  preloaderBar.style.width = `${preloaderValue}%`;
  if (preloaderValue >= 100) {
    window.clearInterval(preloadTimer);
    preloader.classList.add("is-complete");
    window.setTimeout(() => {
      preloader.classList.add("is-leaving");
      window.setTimeout(() => preloader.classList.add("is-hidden"), prefersReducedMotion ? 180 : 760);
    }, prefersReducedMotion ? 60 : 220);
  }
}, prefersReducedMotion ? 40 : 58);

let lenisInstance = null;
if (window.Lenis && !prefersReducedMotion) {
  lenisInstance = new window.Lenis({ lerp: 0.085, smoothWheel: true });
  const raf = (time) => {
    lenisInstance.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}

function scrollToTarget(target) {
  const offset = window.innerWidth <= 980 ? 88 : 104;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  if (lenisInstance) {
    lenisInstance.scrollTo(top, { duration: 1.1 });
  } else {
    window.scrollTo({ top, behavior: "smooth" });
  }
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    scrollToTarget(target);
    history.pushState(null, "", link.getAttribute("href"));
  });
});

if (window.location.hash) {
  window.setTimeout(() => {
    const target = document.querySelector(window.location.hash);
    if (target) scrollToTarget(target);
  }, 120);
}

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 100);
};
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

menuToggle.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("is-open");
  document.body.classList.toggle("menu-open", isOpen);
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  });
});

const phrases = ["приносят клиентов", "работают 24/7", "растут вместе с вами"];
let phraseIndex = 0;
window.setInterval(() => {
  phraseIndex = (phraseIndex + 1) % phrases.length;
  morphTarget.animate(
    [
      { opacity: 1, filter: "blur(0)", transform: "translateY(0)" },
      { opacity: 0, filter: "blur(12px)", transform: "translateY(12px)" },
    ],
    { duration: 240, easing: "ease-in", fill: "forwards" }
  ).onfinish = () => {
    morphTarget.textContent = phrases[phraseIndex];
    morphTarget.animate(
      [
        { opacity: 0, filter: "blur(12px)", transform: "translateY(-12px)" },
        { opacity: 1, filter: "blur(0)", transform: "translateY(0)" },
      ],
      { duration: 420, easing: "cubic-bezier(.19,1,.22,1)", fill: "forwards" }
    );
  };
}, 2600);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        if (entry.target.classList.contains("process")) {
          entry.target.querySelector(".timeline")?.classList.add("is-visible");
        }
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".section-reveal").forEach((section) => revealObserver.observe(section));

function renderService(index) {
  const item = serviceContent[index];
  serviceRows.forEach((row) => row.classList.toggle("is-active", Number(row.dataset.service) === index));
  servicePreview.innerHTML = `
    <p class="mono-label">[ смотреть → ]</p>
    <h3>${item.title}</h3>
    <p>${item.body}</p>
    <div class="tag-row">${item.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
  `;
}

serviceRows.forEach((row) => {
  const index = Number(row.dataset.service);
  row.addEventListener("mouseenter", () => renderService(index));
  row.addEventListener("focus", () => renderService(index));
  row.addEventListener("click", () => renderService(index));
});

function renderPricing(category) {
  const data = pricingContent[category];
  if (!data) return;

  pricingNote.textContent = data.note;
  pricingTabs.forEach((tab) => {
    const isActive = tab.dataset.pricingTab === category;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    if (isActive) {
      tab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  });

  planCards.forEach((card, index) => {
    const plan = data.plans[index];
    card.querySelector("[data-plan-badge]").textContent = plan.badge;
    card.querySelector("[data-plan-title]").textContent = plan.title;
    card.querySelector("[data-plan-price]").textContent = plan.price;
    card.querySelector("[data-plan-description]").textContent = plan.description;
    card.querySelector("[data-plan-includes]").innerHTML = plan.includes.map((item) => `<li>${item}</li>`).join("");
  });
}

pricingTabs.forEach((tab) => {
  tab.addEventListener("click", () => renderPricing(tab.dataset.pricingTab));
});

if (cursorDot && cursorRing) {
  let dotX = 0;
  let dotY = 0;
  let ringX = 0;
  let ringY = 0;

  window.addEventListener(
    "pointermove",
    (event) => {
      dotX = event.clientX;
      dotY = event.clientY;
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
    },
    { passive: true }
  );

  const animateCursor = () => {
    ringX += (dotX - ringX) * 0.18;
    ringY += (dotY - ringY) * 0.18;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  document.querySelectorAll("[data-cursor], a, button").forEach((node) => {
    node.addEventListener("mouseenter", () => cursorRing.classList.add("is-active"));
    node.addEventListener("mouseleave", () => cursorRing.classList.remove("is-active"));
  });
}
