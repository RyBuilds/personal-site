'use strict';

// CONTENTS //

// MAP BOX API
// TOGGLE NIGHTMODE / DAYMODE
// DETECT THEME PREFERENCE
// PHOTO SWIPPER
// MAIN FILTER MENU FUNCTIONALITY
// SECONDARY FILTER MENU FUNCTIONALITY
// SPOTIFY API
// RUNNING ROTATION

//             //
//             //
// MAP BOX API //
//             //
//             //

mapboxgl.accessToken =
  'pk.eyJ1IjoicnlidWlsZHMiLCJhIjoiY2t3YjAyZWs1MGhibzJ2bXdldm9ieXo3ciJ9.Ofx9XCRLrLtO4mJkiu5rWg';
const latitude = 51.49910499837011;
const longitude = -0.1005871429501992;
const coords = [longitude, latitude];

let mapStyle;
let mapTheme;

// let currentZoom = 0;

const setMapStyle = function () {
  const mapStyle = document.body.classList.contains(`dark`)
    ? 'dark-v10'
    : 'light-v10';
  return mapStyle;
};

const setMapTheme = function () {
  const mapTheme = `mapbox://styles/mapbox/${setMapStyle()}`;
  return mapTheme;
};

const mapZoom = getComputedStyle(document.body).getPropertyValue(
  '--mapbox-zoom'
);
const mapIconSize = getComputedStyle(document.body).getPropertyValue(
  `--mapbox-icon-size`
);

const mobileDevice = getComputedStyle(document.body).getPropertyValue(
  `--mobile-device`
);

function setupMap(coords) {
  const map = new mapboxgl.Map({
    container: 'map',
    style: setMapTheme(),
    // MAP THEMES
    // light-v10
    // dark-v10
    // streets-v11
    // navigation-day-v1
    // navigation-night-v1
    attributionControl: false,
    center: coords,
    zoom: mapZoom,
  });
  map.dragRotate.disable();
  map.touchPitch.disable();
  if (mobileDevice == true) {
    map.dragPan.disable();
    map.scrollZoom.disable();
    map.doubleClickZoom.disable();
    map.touchZoomRotate.disable();
  }

  map.on('load', () => {
    map.loadImage('img/memoji-map.png', (error, image) => {
      if (error) throw error;
      map.addImage('memoji', image);
      map.addSource('point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [longitude, latitude],
              },
            },
          ],
        },
      });
      map.addLayer({
        id: 'points',
        type: 'symbol',
        source: 'point',
        layout: {
          'icon-image': 'memoji',
          'icon-size': Number(mapIconSize),
        },
      });
    });
  });

  map.on('load', () => {
    const layers = map.getStyle().layers;
    const labelLayerId = layers.find(
      layer => layer.type === 'symbol' && layer.layout['text-field']
    ).id;
    // map.addLayer(
    //   {
    //     id: 'add-3d-buildings',
    //     source: 'composite',
    //     'source-layer': 'building',
    //     filter: ['==', 'extrude', 'true'],
    //     type: 'fill-extrusion',
    //     minzoom: 9,
    //     paint: {
    //       'fill-extrusion-color': '#aaa',
    //       'fill-extrusion-height': [
    //         'interpolate',
    //         ['linear'],
    //         ['zoom'],
    //         13,
    //         0,
    //         15.05,
    //         ['get', 'height'],
    //       ],
    //       'fill-extrusion-base': [
    //         'interpolate',
    //         ['linear'],
    //         ['zoom'],
    //         13,
    //         0,
    //         15.05,
    //         ['get', 'min_height'],
    //       ],
    //       'fill-extrusion-opacity': 0.6,
    //     },
    //   },
    labelLayerId;
    // );
  });
}
setupMap(coords);

//                     //
// MAP ZOOM IN AND OUT //
//                     //

const zoomIn = document.querySelector(`.zoom-btn--in`);
const zoomOut = document.querySelector(`.zoom-btn--out`);

let currentZoom = 0;

//                            //
//                            //
// TOGGLE NIGHTMODE / DAYMODE //
//                            //
//                            //

const toggle = document.querySelector(`.toggle-container`);
const body = document.querySelector(`body`);
const card = document.querySelector(`.card`);
toggle.addEventListener(`click`, function () {
  toggle.classList.toggle(`dark`);
  body.classList.toggle(`dark`);
  // console.log(setMapStyle());
  // console.log(setMapTheme());
  setupMap(coords);
});

//                         //
//                         //
// DETECT THEME PREFERENCE //
//                         //
//                         //

function detectColorScheme() {
  // CHECK LOCAL STORAGE FIRST
  if (localStorage.getItem(`theme`)) {
    if (localStorage.getItem(`theme`) == `dark`) {
      body.classList.add(`dark`);
      setupMap(coords);
    }
    if (localStorage.getItem(`theme`) == `light`) {
      body.classList.remove(`dark`);
      setupMap(coords);
    }
    // CHECK SYSTEM PREFERENCES
  } else if (!window.matchMedia) {
    return false;
  } else if (window.matchMedia(`(prefers-color-scheme: dark)`).matches) {
    localStorage.setItem(`theme`, `dark`);
    body.classList.add(`dark`);
    setupMap(coords);
  }
  // DETECT CHANGES AND RELOAD THEME
  window
    .matchMedia(`(prefers-color-scheme: dark)`)
    .addEventListener(`change`, function (event) {
      const colorScheme = event.matches ? `dark` : `light`;

      if (colorScheme === 'dark') {
        body.classList.add(`dark`);
        setupMap(coords);
      } else {
        body.classList.remove(`dark`);
        setupMap(coords);
      }
    });
}
// detectColorScheme();

//               //
//               //
// PHOTO SWIPPER //
//               //
//               //

const slides = document.querySelectorAll(`.slide`);
const buttonLeft = document.querySelector(`.slider-btn--left`);
const buttonRight = document.querySelector(`.slider-btn--right`);
const dotContainer = document.querySelector(`.dots`);

let currentSlide = 0;
const maxSlide = slides.length;

const createDots = function () {
  slides.forEach(function (slide, index) {
    dotContainer.insertAdjacentHTML(
      `beforeend`,
      `<button  class="dots--dot" data-slide="${index}" aria-label="photo-${
        index + 1
      }"></button>`
    );
  });
};

const activeDot = function (slide) {
  document
    .querySelectorAll(`.dots--dot`)
    .forEach(dot => dot.classList.remove(`dots--dot--active`));
  document
    .querySelector(`.dots--dot[data-slide="${slide}"]`)
    .classList.add(`dots--dot--active`);
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
  activeDot(currentSlide);
};

const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activeDot(currentSlide);
};

const init = function () {
  goToSlide(0);
  createDots();
  activeDot(0);
};
init();

buttonLeft.addEventListener(`click`, previousSlide);
buttonRight.addEventListener(`click`, nextSlide);
dotContainer.addEventListener(`click`, function (event) {
  if (event.target.classList.contains(`dots--dot`)) {
    currentSlide = Number(event.target.dataset.slide);
    goToSlide(currentSlide);
    activeDot(currentSlide);
  }
});

//                                //
//                                //
// MAIN FILTER MENU FUNCTIONALITY //
//                                //
//                                //

const filterMain = document.querySelectorAll(`.filter`);
const filterContainerMain = document.querySelector(`.filters-container-main`);

const cardIntro = document.querySelector(`.card--intro`);
const cardMap = document.querySelector(`.card--map`);
const cardPhotos = document.querySelector(`.card--photos`);
const cardRunning = document.querySelector(`.card--running`);
const cardLearning = document.querySelector(`.card--learning`);
const cardSpotify = document.querySelector(`.card--spotify`);
const cardRotation = document.querySelector(`.card--rotation`);
const cardGithub = document.querySelector(`.card--github`);
const cardTwitter = document.querySelector(`.card--twitter`);
const cardLinkedin = document.querySelector(`.card--linkedin`);
const cardInstagram = document.querySelector(`.card--instagram`);

filterContainerMain.addEventListener(`click`, function (event) {
  const clicked = event.target.closest(`.filter`);
  if (!clicked) return;
  filterMain.forEach(filter => filter.classList.remove(`active`));
  clicked.classList.add(`active`);
  cardIntro.setAttribute(`id`, `card--intro--${clicked.dataset.filter}`);
  cardMap.setAttribute(`id`, `card--map--${clicked.dataset.filter}`);
  cardPhotos.setAttribute(`id`, `card--photos--${clicked.dataset.filter}`);
  cardRunning.setAttribute(`id`, `card--running--${clicked.dataset.filter}`);
  cardLearning.setAttribute(`id`, `card--learning--${clicked.dataset.filter}`);
  cardSpotify.setAttribute(`id`, `card--spotify--${clicked.dataset.filter}`);
  cardRotation.setAttribute(`id`, `card--rotation--${clicked.dataset.filter}`);
  cardGithub.setAttribute(`id`, `card--github--${clicked.dataset.filter}`);
  cardTwitter.setAttribute(`id`, `card--twitter--${clicked.dataset.filter}`);
  cardLinkedin.setAttribute(`id`, `card--linkedin--${clicked.dataset.filter}`);
  cardInstagram.setAttribute(
    `id`,
    `card--instagram--${clicked.dataset.filter}`
  );
  if (clicked.dataset.filter === `running`) {
    currentSlide = 3;
    goToSlide(currentSlide);
    activeDot(currentSlide);
  }
});

//                                     //
//                                     //
// SECONDARY FILTER MENU FUNCTIONALITY //
//                                     //
//                                     //

const filterSecondary = document.querySelectorAll(`.filter-secondary`);
const filterContainerSecondary = document.querySelector(
  `.filters-container-secondary`
);
const filterSecondaryContent = document.querySelectorAll(
  `.filter-secondary-content`
);
filterContainerSecondary.addEventListener(`click`, function (event) {
  const clicked = event.target.closest(`.filter-secondary`);
  if (!clicked) return;
  filterSecondary.forEach(filter => filter.classList.remove(`active`));
  filterSecondaryContent.forEach(filter =>
    filter.classList.remove(`filter-content--active`)
  );
  clicked.classList.add(`active`);
  document
    .querySelector(`.filter-content--${clicked.dataset.filter}`)
    .classList.add(`filter-content--active`);
});

//             //
//             //
// SPOTIFY API //
//             //
//             //

const spotifyApiUrl = `https://registe-site-backend.herokuapp.com/v1/spotify`;
async function getSpotifyData() {
  const response = await fetch(spotifyApiUrl);
  const data = await response.json();
  const { name, url, imageUrl, previewUrl, artistName } = data;
  document.getElementById(`spotify-song`).textContent = name;
  document.getElementById(`spotify-song`).setAttribute(`href`, `${url}`);
  document.getElementById(`spotify-artwork`).setAttribute(`src`, `${imageUrl}`);
  document.getElementById(`spotify-artwork`).setAttribute(`href`, `${url}`);
  document
    .getElementById(`spotify-preview`)
    .setAttribute(`href`, `${previewUrl}`);
  document.getElementById(`spotify-artist`).textContent = artistName;
}
getSpotifyData();

//                  //
//                  //
// RUNNING ROTATION //
//                  //
//                  //

const rotationContainer = document.querySelector(`.rotation-container`);
const rotationShoe = document.querySelectorAll(`.rotation-shoe`);
const shoeImage = document.querySelectorAll(`.rotation-shoe-image`);

const runningRotation = function () {
  rotationContainer.addEventListener(`click`, function (event) {
    const clicked = event.target.closest(`.rotation-shoe`);
    if (!clicked) return;
    // REMOVE ACTIVE CLASS
    rotationShoe.forEach(shoe =>
      shoe.classList.remove(`rotation-shoe--active`)
    );
    shoeImage.forEach(image =>
      image.classList.remove(`rotation-shoe-image--active`)
    );
    // ADD ACTIVE CLASS
    clicked.classList.add(`rotation-shoe--active`);
    document
      .querySelector(`.rotation-shoe-image--${clicked.dataset.shoe}`)
      .classList.add(`rotation-shoe-image--active`);
  });
};
runningRotation();
