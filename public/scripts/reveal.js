const items = document.querySelectorAll('[data-reveal]');

items.forEach((el) => {
  const parent = el.parentElement;
  if (!parent) return;

  const siblings = [...parent.querySelectorAll(':scope > [data-reveal]')];
  const index = siblings.indexOf(el);

  if (index > 0) {
    el.style.setProperty('--reveal-delay', `${index * 80}ms`);
  }
});

function initReveal() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  items.forEach((el) => io.observe(el));
}

requestAnimationFrame(() => {
  requestAnimationFrame(initReveal);
});
