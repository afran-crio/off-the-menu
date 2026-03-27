/* ============================================
   OFF THE MENU — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll behavior ---
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScroll = currentScroll;
  });

  // --- Mobile menu toggle ---
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('nav__hamburger--active');
      mobileMenu.classList.toggle('nav__mobile--active');
      document.body.style.overflow = mobileMenu.classList.contains('nav__mobile--active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('nav__hamburger--active');
        mobileMenu.classList.remove('nav__mobile--active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scroll reveal animations ---
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  // --- Active nav link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('nav__link--active');
    }
  });

  // --- Contact form handling ---
  const form = document.querySelector('.contact__form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn');
      const originalText = btn.textContent;
      btn.textContent = 'Message Sent';
      btn.style.backgroundColor = '#1a8a1a';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
        form.reset();
      }, 3000);
    });
  }

  // --- Partners logo infinite scroll (optional subtle animation) ---
  const partnersGrid = document.querySelector('.partners__grid');
  if (partnersGrid) {
    const logos = partnersGrid.querySelectorAll('.partners__logo');
    logos.forEach((logo, i) => {
      logo.style.animationDelay = `${i * 0.1}s`;
    });
  }

});
