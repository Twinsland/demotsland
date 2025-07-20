// Données de musique
const musiques = [
  {
    titre: "Sagbohan Danialou - Djidjoho",
    fichier: "assets/musics/sagbohan1.mp3"
  },
  {
    titre: "Angélique Kidjo - Agolo",
    fichier: "assets/musics/kidjo1.mp3"
  },
  {
    titre: "First King - Bon Choix",
    fichier: "assets/musics/firstking1.mp3"
  }
];

// Index de musique actuelle
let indexMusique = 0;

// Éléments DOM pour la musique
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const artistName = document.getElementById("artist-name");
const trackName = document.getElementById("track-name");

// Fonction pour charger une musique
function chargerMusique(index) {
  const musique = musiques[index];
  audio.src = musique.fichier;
  const [artiste, titre] = musique.titre.split(" - ");
  artistName.textContent = artiste?.trim() || "Artiste inconnu";
  trackName.textContent = titre?.trim() || "Titre inconnu";
}

// Lecture / Pause
function jouerMusique() {
  audio.play().then(() => {
    playBtn.innerHTML = "⏸";
  }).catch(err => {
    console.warn("Lecture bloquée :", err);
  });
}

function pauseMusique() {
  audio.pause();
  playBtn.innerHTML = "▶";
}

// Toggle lecture
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    jouerMusique();
  } else {
    pauseMusique();
  }
});

// Musique suivante
nextBtn.addEventListener("click", () => {
  indexMusique = (indexMusique + 1) % musiques.length;
  chargerMusique(indexMusique);
  jouerMusique();
});

// Musique précédente
prevBtn.addEventListener("click", () => {
  indexMusique = (indexMusique - 1 + musiques.length) % musiques.length;
  chargerMusique(indexMusique);
  jouerMusique();
});

// Initialisation carte Leaflet
const carte = L.map("map").setView([6.3703, 2.3912], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(carte);

// Chargement d'une ville
function chargerVille(nomVille) {
  fetch(`data/${nomVille}.geojson`)
    .then(response => response.json())
    .then(data => {
      L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
          if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name);
          }
        }
      }).addTo(carte);
    })
    .catch(error => console.error("Erreur de chargement de la ville :", error));
}

// Menu déroulant personnalisé
const dropdown = document.getElementById("villeDropdown");
const options = document.getElementById("villeOptions");

dropdown.addEventListener("click", () => {
  options.classList.toggle("show");
});

options.querySelectorAll("li").forEach((li) => {
  li.addEventListener("click", () => {
    const ville = li.getAttribute("data-ville");
    dropdown.firstChild.textContent = li.textContent;
    options.classList.remove("show");
    chargerVille(ville);
  });
});

// Chargement initial de la musique (sans auto-play)
window.addEventListener("DOMContentLoaded", () => {
  chargerMusique(indexMusique);
});
