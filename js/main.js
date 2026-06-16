/* main.js – IPC Carmel Dubai */
(function () {
  'use strict';

  /* ── Hero Video Carousel ─────────────────────────────────────────────── */
  function initHero() {
    const allVideos = Array.from(document.querySelectorAll('.hero-video'));
    const dots      = Array.from(document.querySelectorAll('.hero-dot'));
    if (!allVideos.length) return;

    /* Only treat a video as available if its src file actually loads */
    const available = [];

    function tryLoad(vid) {
      return new Promise((resolve) => {
        if (!vid.src || vid.src.endsWith('/')) { resolve(false); return; }
        vid.addEventListener('canplay', () => resolve(true),  { once: true });
        vid.addEventListener('error',   () => resolve(false), { once: true });
        vid.load();
      });
    }

    let current = 0;
    let timer   = null;

    function showSlide(idx) {
      available.forEach((v, i) => {
        const on = i === idx;
        v.classList.toggle('active', on);
        if (on) { v.play().catch(() => {}); }
        else    { v.pause(); }
      });
      /* update dots based on available count */
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      current = idx;
    }

    function advance() {
      showSlide((current + 1) % available.length);
    }

    function startCarousel() {
      clearInterval(timer);
      if (available.length < 2) return; // single video just loops via `loop` attr
      timer = setInterval(advance, 6000);
      available.forEach((v) => {
        v.addEventListener('ended', () => { clearInterval(timer); advance(); startCarousel(); });
      });
    }

    /* Check which video files actually exist, then start */
    Promise.all(allVideos.map(tryLoad)).then((results) => {
      allVideos.forEach((v, i) => { if (results[i]) available.push(v); });

      /* Hide dots if only 0 or 1 video loaded */
      const dotsWrap = document.getElementById('heroDots');
      if (dotsWrap && available.length < 2) dotsWrap.style.display = 'none';

      if (!available.length) return; /* all missing – gradient fallback shows */

      /* Remove active from all first, then activate first available */
      allVideos.forEach((v) => v.classList.remove('active'));
      showSlide(0);
      startCarousel();
    });

    /* dot click handlers */
    dots.forEach((d, i) => {
      d.addEventListener('click', () => {
        if (i < available.length) { showSlide(i); startCarousel(); }
      });
    });
  }

  /* ── Scroll Fade-Up Animation ────────────────────────────────────────── */
  function initScrollAnim() {
    const els = document.querySelectorAll('.fade-up');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    els.forEach((el) => observer.observe(el));
  }

  /* ── Lightbox (gallery page) ─────────────────────────────────────────── */
  function initLightbox() {
    const overlay = document.querySelector('.lightbox-overlay');
    if (!overlay) return;

    const imgEl   = overlay.querySelector('.lightbox-img');
    const items   = Array.from(document.querySelectorAll('.gallery-item'));
    let   current = 0;

    function open(idx) {
      current = idx;
      const src = items[idx].querySelector('img').src;
      imgEl.src = src;
      imgEl.alt = items[idx].querySelector('img').alt;
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    function nav(delta) {
      open((current + delta + items.length) % items.length);
    }

    items.forEach((item, i) => item.addEventListener('click', () => open(i)));

    overlay.querySelector('.lightbox-close').addEventListener('click', close);
    overlay.querySelector('.lightbox-prev').addEventListener('click', () => nav(-1));
    overlay.querySelector('.lightbox-next').addEventListener('click', () => nav(1));

    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    document.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('open')) return;
      if (e.key === 'Escape')      close();
      if (e.key === 'ArrowRight')  nav(1);
      if (e.key === 'ArrowLeft')   nav(-1);
    });
  }

  /* ── Navbar active link ──────────────────────────────────────────────── */
  function markActiveNav() {
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (href === page || (page === 'index.html' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ── Init ────────────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initHero();
    initScrollAnim();
    initLightbox();
    markActiveNav();
  });
})();
