const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.mobile-nav');

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

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const motionTargets = document.querySelectorAll('.reveal-text, .reveal-copy');

if (motionTargets.length && !reduceMotion) {
  document.body.classList.add('motion-ready');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -35px 0px' });

    motionTargets.forEach((element) => revealObserver.observe(element));

  } else {
    motionTargets.forEach((element) => element.classList.add('is-visible'));
  }
}
