(function renderLayout() {
  function init() {
    const rawPath = window.location.pathname || "";
    const fileName = rawPath.substring(rawPath.lastIndexOf("/") + 1) || "index.html";

    const headerHTML = `
      <header class="navbar">
        <div class="container nav-inner">
          <a href="index.html" class="brand">
            <span class="brand-mark">N</span>
            <span>Nayu Technologies</span>
          </a>

          <button class="mobile-toggle" id="mobileMenuBtn" aria-label="Toggle navigation" aria-expanded="false">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <nav class="nav-links" id="navLinks">
            <a href="index.html" class="${fileName === 'index.html' ? 'active' : ''}">Home</a>
            <a href="index.html#services">Services</a>
            <a href="index.html#domains">Practice Areas</a>
            <a href="about.html" class="${fileName === 'about.html' ? 'active' : ''}">About Us</a>
            <a href="blog.html" class="${fileName === 'blog.html' ? 'active' : ''}">Insights</a>
            <a href="contact.html" class="btn btn-primary btn-sm" style="color: #FFFFFF;">Partner With Us</a>
          </nav>
        </div>
      </header>
    `;

    const footerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <div class="brand" style="margin-bottom: 10px;">
                <span class="brand-mark">N</span>
                <span>Nayu Technologies Inc.</span>
              </div>
              <p style="max-width: 380px; color: var(--text-secondary);">
                Canadian IT Consulting, Staff Augmentation, Contract Resource Management, and Payroll Administration Partner.
              </p>
            </div>

            <div>
              <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 10px;">Company</div>
              <div class="footer-links">
                <a href="index.html">Home</a>
                <a href="index.html#services">Services</a>
                <a href="about.html">About Us</a>
                <a href="blog.html">Insights</a>
                <a href="contact.html">Contact</a>
              </div>
            </div>

            <div>
              <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 10px;">Contact</div>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <a href="mailto:Deepakcanada86@gmail.com">Deepakcanada86@gmail.com</a>
                <a href="tel:+16478896266">+1 (647) 889-6266</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <span>&copy; ${new Date().getFullYear()} Nayu Technologies Inc. All rights reserved.</span>
            <span>Ontario, Canada &bull; Serving North America</span>
          </div>
        </div>
      </footer>
    `;

    const headerMount = document.getElementById("site-header");
    const footerMount = document.getElementById("site-footer");

    if (headerMount) headerMount.innerHTML = headerHTML;
    if (footerMount) footerMount.innerHTML = footerHTML;

    const mobileBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");

    if (mobileBtn && navLinks) {
      mobileBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        mobileBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });

      navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("open");
          mobileBtn.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
