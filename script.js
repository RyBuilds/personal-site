'use strict';

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

function setupMap(coords) {
  const map = new mapboxgl.Map({
    container: 'map',
    style: setMapTheme(),
    // light-v10
    // dark-v10
    // streets-v11
    // navigation-day-v1
    // navigation-night-v1
    attributionControl: false,
    center: coords,
    zoom: 13.15,
  });

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
          'icon-size': 0.25,
        },
      });
    });
  });

  map.on('load', () => {
    const layers = map.getStyle().layers;
    const labelLayerId = layers.find(
      layer => layer.type === 'symbol' && layer.layout['text-field']
    ).id;
    map.addLayer(
      {
        id: 'add-3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 9,
        paint: {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            13,
            0,
            15.05,
            ['get', 'height'],
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            13,
            0,
            15.05,
            ['get', 'min_height'],
          ],
          'fill-extrusion-opacity': 0.6,
        },
      },
      labelLayerId
    );
  });
}
setupMap(coords);

//                            //
//                            //
// TOGGLE NIGHTMODE / DAYMODE //
//                            //
//                            //

const toggle = document.querySelector(`.toggle`);
const body = document.querySelector(`body`);
const navCta = document.querySelector(`body`);
const card = document.querySelector(`.card`);
toggle.addEventListener(`click`, function () {
  toggle.classList.toggle(`dark`);
  body.classList.toggle(`dark`);
  // console.log(setMapStyle());
  // console.log(setMapTheme());
  setupMap(coords);
});

//                                //
//                                //
// MAIN FILTER MENU FUNCTIONALITY //
//                                //
//                                //

const cardIntro = document.querySelector(`.card--intro`);
const cardPhotos = document.querySelector(`.card--photos`);
const cardMap = document.querySelector(`.card--map`);
const cardSpotify = document.querySelector(`.card--spotify`);
const cardRotation = document.querySelector(`.card--rotation`);
const cardGuestbook = document.querySelector(`.card--guestbook`);
const cardRunning = document.querySelector(`.card--running`);
const cardGithub = document.querySelector(`.card--github`);
const cardTwitter = document.querySelector(`.card--twitter`);
const cardInstagram = document.querySelector(`.card--instagram`);
const cardLinkedin = document.querySelector(`.card--linkedin`);
const filterMain = document.querySelectorAll(`.filter`);
const filterContainerMain = document.querySelector(`.filters-container-main`);
filterContainerMain.addEventListener(`click`, function (event) {
  const clicked = event.target.closest(`.filter`);
  if (!clicked) return;
  filterMain.forEach(filter => filter.classList.remove(`active`));
  clicked.classList.add(`active`);
  cardIntro.setAttribute(`id`, `card--intro--${clicked.dataset.filter}`);
  cardPhotos.setAttribute(`id`, `card--photos--${clicked.dataset.filter}`);
  cardMap.setAttribute(`id`, `card--map--${clicked.dataset.filter}`);
  cardSpotify.setAttribute(`id`, `card--spotify--${clicked.dataset.filter}`);
  cardRotation.setAttribute(`id`, `card--rotation--${clicked.dataset.filter}`);
  cardRunning.setAttribute(`id`, `card--running--${clicked.dataset.filter}`);
  cardGithub.setAttribute(`id`, `card--github--${clicked.dataset.filter}`);
  cardTwitter.setAttribute(`id`, `card--twitter--${clicked.dataset.filter}`);
  cardLinkedin.setAttribute(`id`, `card--linkedin--${clicked.dataset.filter}`);
  cardGuestbook.setAttribute(
    `id`,
    `card--guestbook--${clicked.dataset.filter}`
  );
  cardInstagram.setAttribute(
    `id`,
    `card--instagram--${clicked.dataset.filter}`
  );
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

const spotifyApiUrl = `http://registe-site-backend.herokuapp.com/v1/spotify`;

async function getSpotifyData() {
  const response = await fetch(spotifyApiUrl);
  const data = await response.json();
  const { name, url, imageUrl, previewUrl } = data;
  document.getElementById(`spotify-song`).textContent = name;
  document.getElementById(`spotify-song`).setAttribute(`href`, `${url}`);
  document.getElementById(`spotify-artwork`).setAttribute(`src`, `${imageUrl}`);
  document.getElementById(`spotify-artwork`).setAttribute(`href`, `${url}`);
  // document.getElementById(`spotify-preview`).textContent = previewUrl;
  // console.log(name, url, imageUrl, previewUrl);
}
getSpotifyData();

//               //
//               //
// PHOTO SWIPPER //
//               //
//               //

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
  autoplay: {
    delay: 6000,
  },
  effect: 'fade',
  crossFade: true,
});
