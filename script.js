const villes = [
  { nom: "Cotonou", lat: 6.3703, lon: 2.3912, premium: true },
  { nom: "Porto-Novo", lat: 6.4969, lon: 2.6289 },
  { nom: "Parakou", lat: 9.34, lon: 2.63 },
  { nom: "Abomey-Calavi", lat: 6.4483, lon: 2.3556 }
];

const carte = L.map('map').setView([9.3077, 2.3158], 7);

// Carte de base
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(carte);

// Marqueurs
const marqueurs = {};

villes.forEach(ville => {
  const couleur = ville.premium ? 'gold' : 'blue';
  const marker = L.circleMarker([ville.lat, ville.lon], {
    radius: 10,
    color: couleur,
    fillColor: couleur,
    fillOpacity: 0.8
  }).addTo(carte).bindPopup(ville.nom);
  marqueurs[ville.nom] = marker;

  // Ajout dans le menu
  const option = document.createElement("option");
  option.value = ville.nom;
  option.textContent = ville.nom + (ville.premium ? " (Premium)" : "");
  document.getElementById("ville-select").appendChild(option);
});

// GéoJSON pour frontières
fetch('assets/geojson/benin-border.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: "gold",
        weight: 3,
        opacity: 0.9
      }
    }).addTo(carte);
  });

fetch('assets/geojson/departements.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: "#ffaa00",
        weight: 1,
        dashArray: '4'
      }
    }).addTo(carte);
  });

// Gestion sélection ville
document.getElementById("ville-select").addEventListener("change", function () {
  const nomVille = this.value;
  if (nomVille && marqueurs[nomVille]) {
    const marker = marqueurs[nomVille];
    carte.setView(marker.getLatLng(), 13);
    marker.openPopup();
  } else {
    carte.setView([9.3077, 2.3158], 7);
  }
});

// Les musiques
const musiques = [
  {
    titre: "Sagbohan Danialou - Djidjoho",
    fichier: "assets/musics/sagbohan1.mp3",
  },
  {
    titre: "Angélique Kidjo - Agolo",
    fichier: "assets/musics/kidjo1.mp3",
  },
  {
    titre: "First King - Bon Choix",
    fichier: "assets/musics/firstking1.mp3",
  }
];

let indexMusique = 0;
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const trackName = document.getElementById("track-name");
const artistName = document.getElementById("artist-name");

function chargerMusique(index) {
  const musique = musiques[index];
  audio.src = musique.fichier;
  const [artiste, titre] = musique.titre.split(" - ");
  artistName.textContent = artiste || "Artiste inconnu";
  trackName.textContent = titre || "Titre inconnu";
}

function jouerMusique() {
  audio.play();
  playBtn.innerHTML = "⏸"; // Icône pause
}

function pauseMusique() {
  audio.pause();
  playBtn.innerHTML = "▶"; // Icône lecture
}

function musiqueSuivante() {
  indexMusique = (indexMusique + 1) % musiques.length;
  chargerMusique(indexMusique);
  jouerMusique();
}

function musiquePrecedente() {
  indexMusique = (indexMusique - 1 + musiques.length) % musiques.length;
  chargerMusique(indexMusique);
  jouerMusique();
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    jouerMusique();
  } else {
    pauseMusique();
  }
});

nextBtn.addEventListener("click", musiqueSuivante);
prevBtn.addEventListener("click", musiquePrecedente);

window.addEventListener("DOMContentLoaded", () => {
  chargerMusique(indexMusique);
});

window.addEventListener("DOMContentLoaded", () => {
  chargerMusique(indexMusique);
  jouerMusique(); // Ajoute cette ligne pour lecture automatique
});

const lecteur = document.querySelector('.music-player');

lecteur.addEventListener('click', () => {
  lecteur.classList.toggle('open');
});

[playBtn, prevBtn, nextBtn].forEach(btn => {
  btn.addEventListener("click", e => e.stopPropagation());
});

document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.getElementById("villeDropdown");
  const options = document.getElementById("villeOptions");

  dropdown.addEventListener("click", () => {
    dropdown.classList.toggle("open");
  });

  options.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", () => {
      const villeChoisie = item.dataset.ville;
      dropdown.childNodes[0].textContent = item.textContent;
      dropdown.classList.remove("open");

      // Appelle ici ta logique de chargement de la ville sélectionnée
      chargerVille(villeChoisie);
    });
  });

  function chargerVille(ville) {
    // Exemple : affiche la ville ou effectue une action
    console.log("Ville sélectionnée :", ville);

    // Tu peux y associer une fonction pour changer de couche, d'image, de données GeoJSON, etc.
    // Exemple si tu veux charger une couche GeoJSON spécifique :
    // map.eachLayer((layer) => {
    //   if (layer.feature) map.removeLayer(layer); // Nettoyer
    // });
    // L.geoJSON(listeGeoJSON[ville]).addTo(map);
  }

  // Pour fermer le menu si clic en dehors
  window.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
    }
  });
});

const listeGeoJSON = {
  "cotonou": "data/cotonou.geojson",
  "porto-novo": "data/porto-novo.geojson",
  // etc.
};
