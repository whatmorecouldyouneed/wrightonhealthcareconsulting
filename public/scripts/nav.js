const header = document.querySelector('.header');
const toggle = document.querySelector('.header__toggle');
const nav = document.querySelector('.header__nav');

function setMenuOpen(isOpen) {
  if (!toggle || !nav) return;

  nav.classList.toggle('is-open', isOpen);
  header?.classList.toggle('header--menu-open', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
}

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    setMenuOpen(!nav.classList.contains('is-open'));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });
}
