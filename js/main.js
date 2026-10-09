/* ==========================================================================
   Main Application Interactive Logic
   Sanjai K - Portfolio
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initTypingEffect();
  initNavbarScroll();
  initScrollSpy();
  initStatsCounter();
  initBackToTop();
  initFooterYear();
  initResumeDownloadHandler();
});

/* --------------------------------------------------------------------------
   1. Theme Switcher (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeIcon = document.getElementById("themeIcon");
  const htmlTag = document.documentElement;

  // Retrieve saved theme or system preference
  const savedTheme = localStorage.getItem("sanjai_portfolio_theme");
  const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  let currentTheme = savedTheme || (systemPrefersLight ? "light" : "dark");
  setTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(currentTheme);
    });
  }

  function setTheme(theme) {
    htmlTag.setAttribute("data-theme", theme);
    localStorage.setItem("sanjai_portfolio_theme", theme);

    if (themeIcon) {
      themeIcon.className = theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
    }
  }
}

/* --------------------------------------------------------------------------
   2. Typing Animation Effect in Hero Section
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typedTarget = document.getElementById("typedRoles");
  if (!typedTarget) return;

  const roles = [
    "Full Stack Developer",
    "Web Developer",
    "Software Developer",
    "Technology Enthusiast"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenRoles = 1800;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTarget.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTarget.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let timeout = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      timeout = delayBetweenRoles;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      timeout = 400;
    }

    setTimeout(type, timeout);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. Sticky Glass Navbar on Scroll
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar-custom");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

/* --------------------------------------------------------------------------
   4. ScrollSpy Active Link Highlight
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link-custom");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Animated Stats Counter
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll(".stat-number[data-count]");
  if (statNumbers.length === 0) return;

  let started = false;

  window.addEventListener("scroll", () => {
    const aboutSection = document.getElementById("about");
    if (!aboutSection || started) return;

    const rect = aboutSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.75) {
      started = true;
      statNumbers.forEach(counter => {
        const target = +counter.getAttribute("data-count");
        let count = 0;
        const increment = Math.ceil(target / 40);

        const updateCount = () => {
          count += increment;
          if (count < target) {
            counter.innerText = count + "+";
            setTimeout(updateCount, 40);
          } else {
            counter.innerText = target + "+";
          }
        };
        updateCount();
      });
    }
  });
}

/* --------------------------------------------------------------------------
   6. Back To Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* --------------------------------------------------------------------------
   7. Dynamic Footer Year
   -------------------------------------------------------------------------- */
function initFooterYear() {
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* --------------------------------------------------------------------------
   8. Resume Download Fallback Handler
   -------------------------------------------------------------------------- */
function initResumeDownloadHandler() {
  const resumeBtns = document.querySelectorAll(".btn-resume-action");
  resumeBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      // Check if resume file is accessible; if missing, show friendly prompt
      const resumeUrl = btn.getAttribute("href");
      if (resumeUrl && resumeUrl.endsWith("resume.pdf")) {
        fetch(resumeUrl, { method: "HEAD" })
          .then(res => {
            if (!res.ok) {
              e.preventDefault();
              alert("Resume PDF placeholder: Please add your updated resume.pdf to 'assets/documents/resume.pdf'.");
            }
          })
          .catch(() => {
            // Fail silently or allow normal navigation
          });
      }
    });
  });
}
