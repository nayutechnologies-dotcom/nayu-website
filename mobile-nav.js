/**
 * ═══════════════════════════════════════════════════════
 *  NAYU TECHNOLOGIES — Premium Mobile Navigation JS
 *  Clean, minimal toggle logic. No frameworks.
 * ═══════════════════════════════════════════════════════
 *
 *  Requires in HTML:
 *    - <button id="navHamburger"> with .hamburger-line spans
 *    - <div id="mobileNavPanel"> with .mobile-nav-link anchors
 *    - <div id="mobileNavBackdrop">
 */

(function () {
  'use strict';

  /* ── Element refs ── */
  const hamburger = document.getElementById('navHamburger');
  const panel     = document.getElementById('mobileNavPanel');
  const backdrop  = document.getElementById('mobileNavBackdrop');

  /* Guard — bail gracefully if elements aren't present */
  if (!hamburger || !panel) return;

  let isOpen = false;

  /* ──────────────────────────────────────
     OPEN
  ────────────────────────────────────── */
  function openMenu() {
    isOpen = true;

    /* Button state */
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation');

    /* Panel slides down */
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');

    /* Backdrop fades in */
    if (backdrop) backdrop.classList.add('is-open');

    /* Prevent body scroll while menu is open */
    document.body.style.overflow = 'hidden';
  }

  /* ──────────────────────────────────────
     CLOSE
  ────────────────────────────────────── */
  function closeMenu() {
    isOpen = false;

    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation');

    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');

    if (backdrop) backdrop.classList.remove('is-open');

    /* Restore body scroll */
    document.body.style.overflow = '';
  }

  /* ──────────────────────────────────────
     TOGGLE
  ────────────────────────────────────── */
  function toggleMenu() {
    if (isOpen) closeMenu();
    else openMenu();
  }

  /* ──────────────────────────────────────
     EVENT LISTENERS
  ────────────────────────────────────── */

  /* Hamburger click */
  hamburger.addEventListener('click', toggleMenu);

  /* Close when a nav link is tapped */
  panel.querySelectorAll('.mobile-nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Close when the backdrop is tapped */
  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  /* Close on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
      hamburger.focus(); /* return focus to trigger element */
    }
  });

  /* Close and restore scroll if viewport expands to desktop */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900 && isOpen) {
      closeMenu();
    }
  });

  /* ──────────────────────────────────────
     NAV SCROLL STATE
     Adds subtle shadow when page is scrolled
  ────────────────────────────────────── */
  var siteNav = document.querySelector('nav');
  if (siteNav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 8) {
        siteNav.classList.add('nav--scrolled');
      } else {
        siteNav.classList.remove('nav--scrolled');
      }
    }, { passive: true });
  }

})();
