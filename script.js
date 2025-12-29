document.addEventListener("DOMContentLoaded", () => {
  // ===== Typing =====
  const roles = ["C/C++ Development", "Python Development", "Automation", "Game Dev"];
  const typingEl = document.getElementById("typing");

  if (typingEl) {
    let roleIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      const word = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        typingEl.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) deleting = true;
      } else {
        charIndex--;
        typingEl.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      const speed = deleting ? 45 : 70;
      setTimeout(tick, speed);
    }

    tick();
  }

  // ===== Footer year =====
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Mobile menu =====
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      mobileMenu.classList.toggle("is-open");
    });

    mobileMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => mobileMenu.classList.remove("is-open"));
    });
  }

  // ===== Active nav link on scroll =====
  const sections = [...document.querySelectorAll("section[id]")];
  const navLinks = [...document.querySelectorAll(".nav__link")];

  function setActive() {
    const y = window.scrollY + 120;
    let current = sections[0]?.id;

    for (const s of sections) {
      if (s.offsetTop <= y) current = s.id;
    }

    navLinks.forEach(a => {
      a.classList.toggle("is-active", a.getAttribute("href") === `#${current}`);
    });
  }

  window.addEventListener("scroll", setActive);
  setActive();

  // ===== Particles background =====
  const particlesRoot = document.getElementById("particles");
  if (particlesRoot) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    particlesRoot.appendChild(canvas);

    let W = 0, H = 0, pts = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const n = Math.min(90, Math.floor((W * H) / 18000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      }));
    }

    window.addEventListener("resize", resize);
    resize();

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(15,23,42,0.35)";
        ctx.fill();
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 140) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(15,23,42,${(1 - d / 140) * 0.18})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    draw();
  }

  // ===== i18n (RU/EN) =====
  const translations = {
    ru: {
      nav_home: "Home",
      nav_about: "Обо мне",
      nav_skills: "Навыки",
      nav_education: "Образование",
      nav_work: "Работа",
      nav_experience: "Опыт",
      nav_contact: "Контакты",

      hero_hi: "Привет!",
      hero_im: "Я",
      hero_into: "Я занимаюсь",

      hero_about_btn: "Обо мне",

      about_title: "Обо мне",
      about_text: "Я начинающий разработчик. Изучаю Python, C/C++ и автоматизацию. Делаю pet-проекты и прокачиваю практику.",

      skills_title: "Навыки",
      skills_english: "Английский: B1 (в процессе)",
      skills_linux: "Linux basics",
      skills_tg: "Telegram bots (в планах)",

      education_title: "Образование",
      education_header: "Учёба / Курсы",
      education_1: "Обучение в БГУИР 2016-2020 по специальности: Инженерно-психологическое обеспечение информационных технологий.",
      education_2: "Основные курсы: Алгоритмы и структуры данных, ООП, Высшая математика, Английский язык.",

      work_title: "Работа",
      work_text_1: 'Работа в "Интерактив" на позиции инженера-системотехника(Сопровождение ПО, помощь и консультирование в IT).',
      work_text: "Коммерческого опыта в разработке пока нет — фокус на pet-проектах и обучении, готов к стажировке/джун-позиции.",

      experience_title: "Опыт",
      exp_1: "Pet-проекты: Python-скрипты для автоматизации и утилиты.",
      exp_2: "Проекты на C/C++ (учебные/личные): алгоритмы, небольшие приложения.",
      exp_3: "Интерес: боты, автоматизация, игровой dev (Phaser и др.).",

      contact_title: "Контакты",
      contact_email: "Email:",
      contact_phone: "Телефон:",
      contact_github: "GitHub:",
      contact_tg: "Telegram:"
    },

    en: {
      nav_home: "Home",
      nav_about: "About",
      nav_skills: "Skills",
      nav_education: "Education",
      nav_work: "Work",
      nav_experience: "Experience",
      nav_contact: "Contact",

      hero_hi: "Hi There,",
      hero_im: "I'm",
      hero_into: "I am into",

      hero_about_btn: "About Me",

      about_title: "About",
      about_text: "I’m a junior developer learning Python, C/C++ and automation. I build pet projects and focus on practical skills.",

      skills_title: "Skills",
      skills_english: "English: B1 (improving)",
      skills_linux: "Linux basics",
      skills_tg: "Telegram bots (planned)",

      education_title: "Education",
      education_header: "Education / Courses",
      education_1: "Studies at BSUIR 2016-2020 in the specialty: Engineering and psychological support of information technology.",
      education_2: "Core courses: Algorithms and Data Structures, OOP, Higher Mathematics, English.",

      work_title: "Work",
      work_text_1: 'Work at Interactive as a systems engineer (software support, assistance and consulting in IT).',
      work_text: "No commercial experience yet — focused on pet projects and learning. Open to internship/junior roles.",

      experience_title: "Experience",
      exp_1: "Pet projects: Python automation scripts and utilities.",
      exp_2: "C/C++ projects (learning/personal): algorithms and small apps.",
      exp_3: "Interests: bots, automation, game dev (Phaser etc.).",

      contact_title: "Contact",
      contact_email: "Email:",
      contact_phone: "Phone:",
      contact_github: "GitHub:",
      contact_tg: "Telegram:"
    }
  };

  function setLanguage(lang) {
    const dict = translations[lang] || translations.ru;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) el.textContent = dict[key];
    });

    localStorage.setItem("lang", lang);

    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });
  }

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  const savedLang = localStorage.getItem("lang") || "ru";
  setLanguage(savedLang);
});
