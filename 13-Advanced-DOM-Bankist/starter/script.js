'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// IMPLEMENTING TABBED COMPONENT
// all html content is coded there already, and CSS makes it invisible/visible
// to be able to change it you simply need to edit the classes apllied to each item
// Within section--2 (tabs) there are the operations__tab

const tabbedComponent = function () {
  // we will need to change operations__content
  // we will need to edit operations__tab to add active

  // Selectors
  const tabs = document.querySelectorAll('.operations__tab');
  const tabsContent = document.querySelectorAll('.operations__content');
  const tabsContainer = document.querySelector('.operations__tab-container');

  // listen when operations__tab-container is clicked, either button or span
  // we will add event handler to common parent because this way we don't need
  // to always run a function on each element

  // Functions
  const revealContent = function (e) {
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    // just selecting the target won't work because it is selectin span also
    // so what we do is use the closest with the class 'operations__tab'
    const clicked = e.target.closest('.operations__tab');
    // guard clause to ignore null clicks
    if (!clicked) return;
    // then simply remove --active class from all and add again
    clicked.classList.add('operations__tab--active');
    // now change the content inside the box
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));
    // activate content area
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
  };

  // Handlers
  tabsContainer.addEventListener('click', revealContent);
};

// IMPLEMENTING MENU FADE ANIMATION
const menuFadeAnimation = function () {
  // Selectors
  const nav = document.querySelector('.nav');

  // Functions
  const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      const logo = link.closest('.nav').querySelector('img');

      siblings.forEach(el => {
        if (el !== link) {
          el.style.opacity = this;
        }
      });
      logo.style.opacity = this;
    }
  };

  // Handlers
  // Passing "argument" into Handler function using bind method and 'this' keyword
  nav.addEventListener('mouseover', handleHover.bind(0.5));
  nav.addEventListener('mouseout', handleHover.bind(1));
};

// STICKY MENU - using intersection observer
const stickyMenu = function () {
  // Selectors
  const header = document.querySelector('.header');
  const nav = document.querySelector('.nav');
  const navHeight = nav.getBoundingClientRect().height;

  // Function
  const stickyNav = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  };

  // we need it to observe section--1 with root null
  const observer = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  });
  observer.observe(header);
};

// REVEAL ELEMENTS ON SCROLL
const revealSections = function () {
  // Now you need to watch the sections
  // Selectors
  const sections = document.querySelectorAll('.section');

  // Function
  const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('hidden');
    observer.unobserve;
  };

  // And we will now remove each section as we see them
  const sectionsObs = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
  });

  // Handlers
  // then we will hide all sections
  sections.forEach(function (section) {
    section.classList.add('hidden');
    sectionsObs.observe(section);
  });
};

// Lazy loading images
const lazyLoadImages = function () {
  // Selections
  // Select all images that contain class features__img
  const imgTargets = querySelectorAll('img[data-src]');

  // Functions
  // to change their src before they appear on window view
  const imgUnhide = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    // change image src
    entry.target.src = entry.target.dataset.src;

    // Only remove class when the image is loaded
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });

    // Then unobserve
    observer.unobserve;
  };
  // Handlers
  // we need to observe these images
  const imgObserver = new IntersectionObserver(imgUnhide, {
    root: null,
    threshold: 0,
  });

  // Observe images
  imgObserver.observe(imgTargets);
};

// Initialization
const init = function () {
  tabbedComponent();
  menuFadeAnimation();
  stickyMenu();
  revealSections();
  lazyLoadImages();
};
init();
