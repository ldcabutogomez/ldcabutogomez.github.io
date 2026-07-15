const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');

if (navToggle && navMenu) {
  const closeMenu = ({ returnFocus = false } = {}) => {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');

    if (returnFocus) {
      navToggle.focus();
    }
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navMenu.classList.toggle('is-open', !isOpen);
  });

  navMenu.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu({ returnFocus: true });
    }
  });

  document.addEventListener('click', (event) => {
    const clickedOutsideNavigation = !event.target.closest('.nav');

    if (clickedOutsideNavigation && navToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });

  const desktopNavigation = window.matchMedia('(min-width: 68rem)');
  desktopNavigation.addEventListener('change', (event) => {
    if (event.matches) {
      closeMenu();
    }
  });
}
