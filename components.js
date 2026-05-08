/**
 * components.js — Nayu Technologies
 *
 * Injects the shared nav and footer into every page at runtime,
 * then wires up all common interactive behaviours:
 *   • Active nav-link highlighting based on current page
 *   • Mobile hamburger menu
 *   • Intersection-observer scroll animations (.fade-up)
 *   • Sector-tab switching (index page)
 */

/* ─── 1. SHARED HTML TEMPLATES ─── */

const NAV_HTML = `
<nav id="site-nav" aria-label="Main navigation">
  <a class="nav-logo" href="./index.html">
    <div class="nav-logo-mark">N</div>
    NayuTech
  </a>

  <ul class="nav-links" role="list">
    <li><a href="./index.html#services"  data-page="index">Services</a></li>
    <li><a href="./index.html#training"  data-page="index">AI Training</a></li>
    <li><a href="./index.html#sectors"   data-page="index">Sectors</a></li>
    <li><a href="./about.html"           data-page="about">About</a></li>
    <li><a href="./blog.html"            data-page="blog">Insights</a></li>
  </ul>

  <a class="btn btn-primary" href="./contact.html">Get Started →</a>

  <button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>

<!-- Mobile overlay menu -->
<ul class="mobile-menu" id="mobile-menu" role="list" aria-label="Mobile navigation" aria-hidden="true">
  <button class="mobile-menu-close" id="mobile-menu-close" aria-label="Close menu">✕</button>
  <li><a href="./index.html#services">Services</a></li>
  <li><a href="./index.html#training">AI Training</a></li>
  <li><a href="./index.html#sectors">Sectors</a></li>
  <li><a href="./about.html">About</a></li>
  <li><a href="./blog.html">Insights</a></li>
  <li><a href="./contact.html" class="btn btn-primary" style="margin-top:1rem;">Get Started →</a></li>
</ul>
`;

const FOOTER_HTML = `
<footer id="site-footer">
  <div class="footer-inner">
    <div>
      <a class="nav-logo" href="./index.html" style="display:inline-flex; margin-bottom:0.25rem;">
        <div class="nav-logo-mark">N</div>
        NayuTech
      </a>
      <p class="footer-desc">
        Nayu Technologies Inc. is an AI &amp; automation consulting firm helping enterprises
        in financial services and beyond harness the power of intelligent technology.
        Toronto, Ontario, Canada.
      </p>
    </div>

    <div class="footer-col">
      <h4>Services</h4>
      <ul>
        <li><a href="./index.html#services">Generative AI</a></li>
        <li><a href="./index.html#services">Intelligent Automation</a></li>
        <li><a href="./index.html#services">Digital Transformation</a></li>
        <li><a href="./index.html#services">Cloud &amp; Security</a></li>
        <li><a href="./index.html#services">Contact Center AI</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>AI Training</h4>
      <ul>
        <li><a href="./index.html#training">AI Literacy</a></li>
        <li><a href="./index.html#training">GenAI for Business</a></li>
        <li><a href="./index.html#training">LLM Engineering</a></li>
        <li><a href="./index.html#training">Agentic AI</a></li>
        <li><a href="./index.html#training">Executive Strategy</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Company</h4>
      <ul>
        <li><a href="./about.html">About Us</a></li>
        <li><a href="./blog.html">Blog</a></li>
        <li><a href="./contact.html">Careers</a></li>
        <li><a href="./contact.html">Contact</a></li>
      </ul>
    </div>
  </div>

  <div class="footer-bottom">
    <span>© 2026 Nayu Technologies Inc. All rights reserved.</span>
    <div class="footer-socials">
      <a href="https://www.linkedin.com/company/nayutech" target="_blank" rel="noopener">LinkedIn</a>
      <a href="./contact.html">Contact</a>
    </div>
  </div>
</footer>
`;

/* ─── 2. INJECT NAV + FOOTER ─── */
(function injectComponents() {
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  const existingFooter = document.getElementById('footer-placeholder');
  if (existingFooter) {
    existingFooter.outerHTML = FOOTER_HTML;
  } else {
    document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
  }
})();

/* ─── 3. ACTIVE NAV LINK ─── */
(function setActiveLink() {
  const path = window.location.pathname;
  const pageMap = {
    'about.html': 'about',
    'blog.html':  'blog',
    'contact.html': 'contact',
  };

  const filename = path.split('/').pop() || 'index.html';
  const currentPage = pageMap[filename] || 'index';

  document.querySelectorAll('.nav-links a[data-page]').forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
})();

/* ─── 4. MOBILE MENU ─── */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger   = document.getElementById('nav-hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');
  const closeBtn    = document.getElementById('mobile-menu-close');

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
});

/* ─── 5. SCROLL FADE-UP ANIMATION ─── */
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});

/* ─── 6. SECTOR TABS (index page only) ─── */
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.sector-tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const sector = tab.dataset.sector;
      document.querySelectorAll('.sector-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.sector-content').forEach(c => c.classList.remove('active'));
      const panel = document.getElementById(`sector-${sector}`);
      if (panel) panel.classList.add('active');
    });
  });
});
