// Initialisation de la carte centrée sur le Bénin
const map = L.map('map').setView([9.3077, 2.3158], 7);

// Fond de carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Icône spéciale dorée pour Cotonou
const goldIcon = L.icon({
  iconUrl: 'assets/images/gold-marker.png',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40]
});

// Effet de flash
function triggerFlash() {
  const flash = document.getElementById('flash');
  flash.style.display = 'block';
  setTimeout(() => flash.style.display = 'none', 500);
}

// Musiques
const musiques = [
  { titre: "Sagbohan Danialou - Djidjoho", fichier: "assets/musics/sagbohan1.mp3" },
  { titre: "Angélique Kidjo - Agolo", fichier: "assets/musics/kidjo1.mp3" },
  { titre: "First King - Bon Choix", fichier: "assets/musics/firstking1.mp3" }
];

let currentTrack = 0;
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const trackName = document.getElementById("track-name");
const artistName = document.getElementById("artist-name");
const musicPlayer = document.querySelector(".music-player");

function loadTrack(index) {
  audio.src = musiques[index].fichier;
  const [artist, titre] = musiques[index].titre.split(" - ");
  artistName.textContent = artist || "Artiste";
  trackName.textContent = titre || "Titre";
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = "❚❚";
  } else {
    audio.pause();
    playBtn.innerHTML = "▶";
  }
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + musiques.length) % musiques.length;
  loadTrack(currentTrack);
  audio.play();
});
nextBtn.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % musiques.length;
  loadTrack(currentTrack);
  audio.play();
});

loadTrack(currentTrack);

musicPlayer.addEventListener("click", () => {
  musicPlayer.classList.toggle("open");
});

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById('ville-menu-toggle');
  const villeList = document.getElementById('ville-list');
  const menuContainer = document.getElementById('ville-menu-container');

  const villeMenu = menuContainer;
  const villeOptions = villeList;

  menuToggle.addEventListener('click', () => {
    villeMenu.classList.toggle('open');
  });

  // Affichage silhouette GeoJSON
  fetch("data/benin.geojson")
    .then(response => response.json())
    .then(data => {
      L.geoJSON(data, {
        style: {
          color: "gold",
          weight: 2,
          fillColor: "rgba(255, 215, 0, 0.3)",
          fillOpacity: 0.4
        }
      }).addTo(map);
    })
    .catch(error => {
      console.error("Erreur lors du chargement du fichier GeoJSON du Bénin :", error);
    });

  // Affichage des villes
  fetch("data/villes.json")
    .then(response => response.json())
    .then(data => {
      data.forEach(ville => {
        if (ville.lat && ville.lng) {
          const marker = L.marker([ville.lat, ville.lng], {
            icon: goldIcon
          }).addTo(map);

          marker.bindPopup(`
            <div style="color: gold;">
              <strong>${ville.nom}</strong><br>
              ${ville.infos}
            </div>
          `);

          // Ajouter au menu
          const li = document.createElement("li");
          li.textContent = ville.nom;
          li.addEventListener("click", () => {
            map.setView([ville.lat, ville.lng], 13);
            marker.openPopup();
            triggerFlash();
            villeMenu.classList.remove("open");
          });
          villeOptions.appendChild(li);
        } else {
          console.warn(`Coordonnées manquantes pour la ville : ${ville.nom}`);
        }
      });
    })
    .catch(error => {
      console.error("Erreur lors du chargement des villes :", error);
    });
});