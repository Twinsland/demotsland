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
    titre: "Sagbohan Danialou - Mystique",
    fichier: "assets/musics/mystique.mp3",
  },
  {
    titre: "Angélique Kidjo - Agolo",
    fichier: "assets/musics/agolo.mp3",
  },
  {
    titre: "First King - Vibe du Bénin",
    fichier: "assets/musics/vibe-benin.mp3",
  }
];
