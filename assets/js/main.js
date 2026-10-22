/*
 * Site script.
 * The full Squadfree main.js expects libraries (AOS, PureCounter, GLightbox,
 * Swiper, Isotope) and page elements that this site does not load, and it
 * stopped with an error on every page. This keeps only what the site uses.
 */
(function () {
  "use strict";

  // Add .scrolled to <body> once the page is scrolled, for header styling.
  function toggleScrolled() {
    document.body.classList.toggle("scrolled", window.scrollY > 100);
  }

  document.addEventListener("scroll", toggleScrolled, { passive: true });
  window.addEventListener("load", toggleScrolled);
})();
