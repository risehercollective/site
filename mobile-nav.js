// Mobile navigation (hamburger) shared across all pages
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const menuOverlay = document.querySelector('.mobile-menu-overlay');

  if (!mobileMenuToggle || !navMenu || !menuOverlay) return;

  function closeMobileMenu() {
    navMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMobileMenu() {
    navMenu.classList.add('active');
    menuOverlay.classList.add('active');
    mobileMenuToggle.classList.add('active');
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  mobileMenuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (navMenu.classList.contains('active')) closeMobileMenu();
    else openMobileMenu();
  });

  menuOverlay.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMobileMenu();
  });

  // Close when clicking a link
  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
});

// Scroll animations for polaroids (mobile only)
document.addEventListener('DOMContentLoaded', () => {
  const isMobile = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
  const reduceMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isMobile || reduceMotion || !('IntersectionObserver' in window)) return;

  const polaroids = Array.from(document.querySelectorAll('.polaroid-frame'));
  if (polaroids.length === 0) return;

  polaroids.forEach((el) => el.classList.add('scroll-animate'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      });
    },
    { root: null, threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  );

  polaroids.forEach((el) => observer.observe(el));
});

// Scroll animations for Menu page (mobile only)
document.addEventListener('DOMContentLoaded', () => {
  const isMobile = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
  const reduceMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMenuPage =
    (typeof location !== 'undefined' && /(^|\/)menu\.html($|[?#])/.test(location.pathname)) ||
    document.title.toLowerCase().includes('menu');

  if (!isMobile || reduceMotion || !isMenuPage || !('IntersectionObserver' in window)) return;

  // Animate actual "menu options" cards + steps (avoid large containers like .section)
  const targets = Array.from(
    document.querySelectorAll('.cookie-card, .product-card, .special-card, .step')
  );
  if (targets.length === 0) return;

  targets.forEach((el) => el.classList.add('scroll-reveal'));

  // Ensure anything already visible on load isn't stuck hidden
  const markVisibleNow = () => {
    const cutoff = window.innerHeight * 0.92;
    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < cutoff) el.classList.add('in-view');
    });
  };
  markVisibleNow();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      });
    },
    { root: null, threshold: 0.12, rootMargin: '0px 0px -12% 0px' }
  );

  targets.forEach((el) => {
    if (!el.classList.contains('in-view')) observer.observe(el);
  });
});
