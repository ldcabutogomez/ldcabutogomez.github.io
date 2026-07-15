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

  const desktopNavigation = window.matchMedia('(min-width: 76rem)');
  desktopNavigation.addEventListener('change', (event) => {
    if (event.matches) {
      closeMenu();
    }
  });
}

const siteHeader = document.querySelector('.site-header');
const sectionLinks = navMenu
  ? [...navMenu.querySelectorAll('a[href^="#"]')]
      .map((link) => {
        const section = document.querySelector(link.getAttribute('href'));
        return section ? { link, section } : null;
      })
      .filter(Boolean)
  : [];

if (siteHeader && sectionLinks.length) {
  let activeSectionId = '';
  let updateRequested = false;

  const setActiveSection = (sectionId) => {
    if (sectionId === activeSectionId) {
      return;
    }

    activeSectionId = sectionId;

    sectionLinks.forEach(({ link, section }) => {
      const isCurrent = section.id === sectionId;
      link.classList.toggle('is-current', isCurrent);

      if (isCurrent) {
        link.setAttribute('aria-current', 'location');
      } else if (link.getAttribute('aria-current') === 'location') {
        link.removeAttribute('aria-current');
      }
    });
  };

  const updateActiveSection = () => {
    updateRequested = false;

    const headerHeight = siteHeader.getBoundingClientRect().height;
    const viewportOffset = Math.min(window.innerHeight * 0.25, 180);
    const activationLine = window.scrollY + headerHeight + viewportOffset;
    const pageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    let currentSection = sectionLinks[0].section;

    sectionLinks.forEach(({ section }) => {
      if (section.offsetTop <= activationLine) {
        currentSection = section;
      }
    });

    if (pageBottom) {
      currentSection = sectionLinks.at(-1).section;
    }

    setActiveSection(currentSection.id);
  };

  const requestActiveSectionUpdate = () => {
    if (!updateRequested) {
      updateRequested = true;
      window.requestAnimationFrame(updateActiveSection);
    }
  };

  window.addEventListener('scroll', requestActiveSectionUpdate, { passive: true });
  window.addEventListener('resize', requestActiveSectionUpdate);
  window.addEventListener('load', requestActiveSectionUpdate);
  requestActiveSectionUpdate();
}
