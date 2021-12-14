'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);
const tabs = document.querySelectorAll(`.operations__tab`);
const tabsContainer = document.querySelector(`.operations__tab-container`);
const tabsContent = document.querySelectorAll(`.operations__content`);
const nav = document.querySelector(`.nav`);

//////////////////// MODAL WINDOW
const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener(`click`, openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////// BUTTON SCROLLING
btnScrollTo.addEventListener(`click`, function (event) {
  const section1Coords = section1.getBoundingClientRect();
  // CURRENT SCROLL POSITION
  console.log(`Current scroll (X/Y)`, window.pageXOffset, window.pageYOffset);
  // VIEWPORT HEIGHT AND WIDTH
  console.log(
    `Viewport height/width`,
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  section1.scrollIntoView({ behavior: `smooth` });
});

//////////////////// PAGE NAVIGATION
document
  .querySelector(`.nav__links`)
  .addEventListener(`click`, function (event) {
    event.preventDefault();
    // MATHCHING STRATEGY
    if (event.target.classList.contains(`nav__link`)) {
      const id = event.target.getAttribute(`href`);
      document.querySelector(id).scrollIntoView({ behavior: `smooth` });
    }
  });

//////////////////// TABBED COMPONENT
tabsContainer.addEventListener(`click`, function (event) {
  const clicked = event.target.closest(`.operations__tab`);
  if (!clicked) return;
  // REMOVE ACTIVE CLASS
  tabs.forEach(tab => tab.classList.remove(`operations__tab--active`));
  tabsContent.forEach(content =>
    content.classList.remove(`operations__content--active`)
  );
  // ADD ACTIVE CLASS
  clicked.classList.add(`operations__tab--active`);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add(`operations__content--active`);
});

//////////////////// MENU FADE ANIMATION
const mouseHover = function (event) {
  if (event.target.classList.contains(`nav__link`)) {
    const selected = event.target;
    const siblings = selected.closest(`.nav`).querySelectorAll(`.nav__link`);
    const logo = selected.closest(`.nav`).querySelector(`img`);

    siblings.forEach(element => {
      if (element !== selected) element.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener(`mouseover`, mouseHover.bind(0.5));
nav.addEventListener(`mouseout`, mouseHover.bind(1));

//////////////////// STICKY NAVIGATION
// INTERSECTION OBSERVER API
const header = document.querySelector(`.header`);
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add(`sticky`);
  else nav.classList.remove(`sticky`);
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//////////////////// REVEALING ELEMENTS ON SCROLL
const allSections = document.querySelectorAll(`.section`);

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove(`section--hidden`);
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
});

//////////////////// LAZY LOADING IMAGES
const targetImages = document.querySelectorAll(`img[data-src]`);

const loadTargetImages = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener(`load`, function () {
    entry.target.classList.remove(`lazy-img`);
  });
  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadTargetImages, {
  root: null,
  threshold: 0,
  rootMargin: `+200px`,
});

targetImages.forEach(image => imageObserver.observe(image));

//////////////////// SLIDERS
const slider = function () {
  const slides = document.querySelectorAll(`.slide`);
  const buttonLeft = document.querySelector(`.slider__btn--left`);
  const buttonRight = document.querySelector(`.slider__btn--right`);
  const dotContainer = document.querySelector(`.dots`);

  let currentSlide = 0;
  const maxSlide = slides.length;

  // FUNCTIONS
  const createDots = function () {
    slides.forEach(function (slide, index) {
      dotContainer.insertAdjacentHTML(
        `beforeend`,
        `<button class="dots__dot" data-slide="${index}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(`.dots__dot`)
      .forEach(dot => dot.classList.remove(`dots__dot--active`));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add(`dots__dot--active`);
  };

  const goToSlide = function (slideNumber) {
    slides.forEach(
      (slide, index) =>
        (slide.style.transform = `translateX(${100 * (index - slideNumber)}%)`)
    );
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const previousSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // EVENT HANDLERS
  buttonRight.addEventListener(`click`, nextSlide);
  buttonLeft.addEventListener(`click`, previousSlide);
  document.addEventListener(`keydown`, function (event) {
    if (event.key === `ArrowRight`) nextSlide();
    if (event.key === `ArrowLeft`) previousSlide();
  });
  dotContainer.addEventListener(`click`, function (event) {
    if (event.target.classList.contains(`dots__dot`)) {
      const slide = event.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// LIFECYCLE DOM EVENTS; DOM CONTENT LOADED
document.addEventListener(`DOMContentLoaded`, function (event) {
  console.log(`HTML parsed and DOM tree built!`, event);
});
