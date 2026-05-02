const header = document.querySelector("[data-header]");
const preloader = document.querySelector(".preloader");
const preloaderCount = document.querySelector(".preloader__count");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const morphTarget = document.querySelector("[data-morph]");
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const serviceRows = [...document.querySelectorAll("[data-service]")];
const servicePreview = document.querySelector("[data-service-preview]");

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

let preloaderValue = 0;
const preloadTimer = window.setInterval(() => {
  preloaderValue = Math.min(100, preloaderValue + Math.ceil(Math.random() * 9));
  preloaderCount.textContent = String(preloaderValue).padStart(2, "0");
  if (preloaderValue >= 100) {
    window.clearInterval(preloadTimer);
    window.setTimeout(() => {
      preloader.classList.add("is-leaving");
      window.setTimeout(() => preloader.classList.add("is-hidden"), 920);
    }, 240);
  }
}, 60);

if (window.Lenis && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const lenis = new window.Lenis({ lerp: 0.085, smoothWheel: true });
  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
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
