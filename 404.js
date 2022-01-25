'use strict';

const toggle = document.querySelector(`.toggle-container`);
const body = document.querySelector(`body`);
const card = document.querySelector(`.card`);
toggle.addEventListener(`click`, function () {
  toggle.classList.toggle(`dark`);
  body.classList.toggle(`dark`);
});

function detectColorScheme() {
  // CHECK LOCAL STORAGE FIRST
  if (localStorage.getItem(`theme`)) {
    if (localStorage.getItem(`theme`) == `dark`) {
      body.classList.add(`dark`);
      setupMap(coords);
    }
    if (localStorage.getItem(`theme`) == `light`) {
      body.classList.remove(`dark`);
    }
    // CHECK SYSTEM PREFERENCES
  } else if (!window.matchMedia) {
    return false;
  } else if (window.matchMedia(`(prefers-color-scheme: dark)`).matches) {
    localStorage.setItem(`theme`, `dark`);
    body.classList.add(`dark`);
  }
  // DETECT CHANGES AND RELOAD THEME
  window
    .matchMedia(`(prefers-color-scheme: dark)`)
    .addEventListener(`change`, function (event) {
      const colorScheme = event.matches ? `dark` : `light`;

      if (colorScheme === 'dark') {
        body.classList.add(`dark`);
      } else {
        body.classList.remove(`dark`);
      }
    });
}
// detectColorScheme();
