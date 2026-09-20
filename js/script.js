/* ==========================================================================
   Portafolio personal — comportamiento del sitio
   Sin dependencias externas: toggle de navegación móvil, scroll-reveal
   con IntersectionObserver y desplazamiento suave para enlaces internos.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ---------- Toggle de navegación móvil ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  const closeNavMenu = () => {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", "false");
    navMenu.setAttribute("data-open", "false");
  };

  const toggleNavMenu = () => {
    if (!navToggle || !navMenu) return;
    const isOpen = navMenu.getAttribute("data-open") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navMenu.setAttribute("data-open", String(!isOpen));
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", toggleNavMenu);
  }

  /* ---------- Scroll-reveal con IntersectionObserver ---------- */
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Sin soporte de IntersectionObserver: mostrar todo de inmediato.
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Desplazamiento suave para enlaces internos ---------- */
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      event.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });

      // Si el menú móvil está abierto, se cierra al navegar.
      closeNavMenu();
    });
  });
});
