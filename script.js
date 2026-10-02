const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.mobile-nav');

// Animate only on entry; content is visible by default and keeps its place.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (document.documentElement.classList.contains('heritage-home') &&
    !reducedMotion.matches && 'IntersectionObserver' in window) {
  const entrances = new IntersectionObserver((entries, observer) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      target.classList.add('heritage-enter');
      target.addEventListener('animationend', () => target.classList.remove('heritage-enter'), { once: true });
      observer.unobserve(target);
    });
  }, { threshold: .12 });
  document.querySelectorAll('.hero-copy, .hero-art, .intro h2, .intro-note, .signature-image, .signature-copy, .closing p')
    .forEach(element => entrances.observe(element));
}

if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Menüyü aç' : 'Menüyü kapat');
    mainNav.classList.toggle('is-open', !isOpen);
  });

  mainNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Menüyü aç');
      mainNav.classList.remove('is-open');
    }
  });
}
