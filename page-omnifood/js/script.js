`use strict`;

// SET CURRENT YEAR
const yearEl = document.querySelector(`.year`);
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// MOBILE NAVIGATION
const headerEl = document.querySelector(`.header`);
const navigationButtonEl = document.querySelector(`.btn-mobile-nav`);
navigationButtonEl.addEventListener(`click`, function () {
  headerEl.classList.toggle(`nav-open`);
});

// SMOOTH SCROLL
// <script defer src=
// "https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js"
// ></script>
const allLinks = document.querySelectorAll(`a:link`); // All w/HREF
allLinks.forEach(function (link) {
  link.addEventListener(`click`, function (event) {
    event.preventDefault();
    const href = link.getAttribute(`href`);
    // SCROLL TO TOP
    if (href === `#`)
      window.scrollTo({
        top: 0,
        behavior: `smooth`,
      });
    // SCROLL TO OTHER SECTIONS
    if (href !== `#` && href.startsWith(`#`)) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: `smooth` });
    }
    // CLOSE MOBILE NAVIGATION
    if (link.classList.contains(`main-nav-link`))
      headerEl.classList.toggle(`nav-open`);
  });
});

// STICKY NAVIGATION
const sectionHeroEl = document.querySelector(`.section-hero`);
const observer = new IntersectionObserver(
  function (entries) {
    const entry = entries[0];
    // ADD STICKY
    if (!entry.isIntersecting) {
      document.body.classList.add(`sticky`);
    }
    // REMOVE STICKY
    if (entry.isIntersecting) {
      document.body.classList.remove(`sticky`);
    }
  },
  {
    // IN THE VIEWPORT
    root: null,
    threshold: 0,
    rootMargin: `-80px`,
  }
);
observer.observe(sectionHeroEl);

//////////////////////\\\\\\\\\\\\\\\\\\\\\\
// FIXING FLEXBOX GAP (SOME SAFARI VERSIONS)
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
