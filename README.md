HTML

<!-- <div class="card card--spotify" id="card--spotify--all">
<div class="spotify-header">
<div class="song-artwork">
<a id="spotify-preview" href="set-dynamically" target="_blank">
<img
id="spotify-artwork"
src="set-dynamically"
alt="Artwork for the song Ryan played most recently"
/>
</a>
</div>
<img
class="spotify-logo"
src="img/spotify-logo.svg"
alt="The Spotify logo"
/>
</div>
<div class="playing-status-container">
<div class="animation-container">
<div class="spotify-animation-1"></div>
<div class="spotify-animation-2"></div>
<div class="spotify-animation-3"></div>
</div>
<div class="playing-status">
<p class="current-status">Offline. Last Played</p>
</div>
</div>
<div class="now-playing">
<a id="spotify-song" href="" target="_blank"></a>
</div>
<div class="spotify-artist">
<p class="song-artist">Placeholder</p>
</div>
</div> -->

CSS

.spotify-header {
display: grid;
grid-template-columns: 1fr 1fr;
margin-bottom: 18px;
}

#spotify-artwork {
width: 50%;
border-radius: 8px;
box-shadow: 0.2rem 0.4rem 1.2rem rgba(0, 0, 0, 0.08);
}

#spotify-artwork:hover {
cursor: pointer;
}

.spotify-logo {
justify-self: end;
width: 48px;
top: 0;
right: 0;
}

BANKIST CSS

.project-logo {
transition: all 1s;
}

.bankist-project-summary {
position: absolute;
width: 100%;
height: 180px;
bottom: -180px;
padding: 32px;
/_ background: #e5f3e8; _/
box-shadow: 0.2rem 0.4rem 12rem rgba(0, 0, 0, 0.08);
transition: 1s;
}

.bankist-project-summary-text {
font-size: 16px;
line-height: 1.2;
transition: 4s;
opacity: 0;
}

.card--bankist:hover .project-logo {
transform: translateY(-80px);
}

.card--bankist:hover .bankist-project-summary {
bottom: -15px;
}

.card--bankist:hover .bankist-project-summary-text {
opacity: 1;
/_ transition: 2s; _/
}

.gradient-1,
.gradient-2,
.gradient-3,
.gradient-4 {
position: absolute;
border-radius: 50%;
z-index: 0;
}

.gradient-1 {
background-color: #7198ff;
height: 200px;
width: 200px;
bottom: -50px;
left: -20px;
filter: blur(50px);
}
.gradient-2 {
background-color: #ad76e8;
height: 150px;
width: 200px;
bottom: -80px;
right: 0;
filter: blur(50px);
}
.gradient-3 {
background-color: #7fea9f;
height: 150px;
width: 200px;
top: 0px;
left: -40px;
filter: blur(70px);
}
.gradient-4 {
background-color: #7198ff;
height: 300px;
width: 300px;
top: -100px;
right: -150px;
filter: blur(50px);
}

---

/\* _/
/_ _/
/_ PROJECTS _/
/_ _/
/_ \*/

.project-logo {
max-width: 40%;
z-index: 1;
}

.card--project {
position: relative;
}

.project-banner {
bottom: 24px;
left: 28px;
position: absolute;
text-transform: uppercase;
letter-spacing: 1px;
font-weight: 600;
font-size: 14px;
padding: 4px;
color: #1d1d1d;
pointer-events: none;
z-index: 1;
}

/\* _/
/_ _/
/_ OMNIFOOD _/
/_ _/
/_ _/
.card--omnifood {
/_ background: #fdf2e9; \*/
overflow: hidden;
}

.omnifood-project-logo {
max-width: 40%;
transition: all 1.2s;
z-index: 1;
}

.project-slider {
z-index: -1;
opacity: 0;
}

.card--omnifood:hover .omnifood-project-logo {
position: relative;
transform: translateX(-148px);
}

.card--omnifood:hover .project-slider {
z-index: 1;
opacity: 1;
}

.project-gradient {
position: absolute;
border-radius: 50%;
z-index: 0;
}
.gradient-1 {
/_ background-color: #fdaa65; _/
height: 300px;
width: 300px;
bottom: -100px;
left: -80px;
filter: blur(150px);
}
.gradient-2 {
/_ background-color: #fdf565; _/
height: 300px;
width: 300px;
bottom: -100px;
right: -20px;
filter: blur(200px);
}
.gradient-3 {
}
.gradient-4 {
}

<!-- PROJECT HTML -->

          <!-- PROJECT BANKIST -->
          <!-- <div
            class="card card--center card--bankist card--project"
            id="card--bankist--all"
          >
            <img
              class="project-logo"
              src="img/bankist-logo-full.png"
              alt="Bankist project logo"
            />
            <div class="bankist-project-summary">
              <p class="bankist-project-summary-text">
                Code-along; took a HTML and CSS site and added functionality
                with JavaScript.
              </p>
            </div>
            <div class="project-banner-container">
              <div class="project-banner">
                <p class="project-text">Project</p>
              </div>
            </div>
            <a
              class="slider-btn slider-btn--right"
              href="page-bankist/"
              target="_blank"
            >
              <ion-icon
                class="button-icon button-icon--right"
                name="chevron-forward-outline"
              ></ion-icon>
            </a>
            <div class="gradient-1"></div>
            <div class="gradient-2"></div>
            <div class="gradient-3"></div>
            <div class="gradient-4"></div>
          </div> -->
          <!-- PROJECT OMNIFOOD -->
          <!-- <div
            class="card card--center card--omnifood card--project"
            id="card--omnifood--all"
          >
            <div class="project-banner-container">
              <div class="project-banner">
                <p class="project-text">Project</p>
              </div>
            </div>
            <img
              class="omnifood-project-logo"
              src="img/omnifood-logo-full.png"
              alt="Omnifood project logo"
            />
            <a
              class="slider-btn slider-btn--right project-slider"
              href="page-omnifood/"
              target="_blank"
            >
              <ion-icon
                class="button-icon button-icon--right"
                name="chevron-forward-outline"
              ></ion-icon>
            </a>
            <div class="project-gradient gradient-1"></div>
            <div class="project-gradient gradient-2"></div>
            <div class="project-gradient gradient-3"></div>
            <div class="project-gradient gradient-4"></div>
          </div> -->
