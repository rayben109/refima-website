// REFIMA — shared site behaviour
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
    }));
  }

  // Header shadow on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10 ? '0 6px 24px rgba(15,31,69,.08)' : 'none';
    });
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Mining-chemicals product filter tabs
  const tabs = document.querySelectorAll('.mc-tab');
  const tiles = document.querySelectorAll('[data-cat]');
  if (tabs.length && tiles.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.dataset.filter;
        tiles.forEach(tile => {
          tile.style.display = (cat === 'all' || tile.dataset.cat === cat) ? '' : 'none';
        });
      });
    });
  }

  // Simple contact form UX (static hosting — no backend wired up)
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Message Sent ✓';
      btn.disabled = true;
      form.reset();
      setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 3500);
    });
  }

  // Animated stat counters
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        let cur = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const timer = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(timer); }
          el.textContent = cur + suffix;
        }, 20);
        co.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(el => co.observe(el));
  }
});
