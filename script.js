// Initialisation de la carte
const map = L.map('map').setView([9.3077, 2.3158], 7);

// Fond de carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Villes principales
const villes = [
  { nom: "Cotonou", coords: [6.3703, 2.3912] },
  { nom: "Porto-Novo", coords: [6.4969, 2.6289] },
  { nom: "Parakou", coords: [9.3467, 2.6090] },
  { nom: "Abomey-Calavi", coords: [6.4483, 2.3554] }
];

// Ajout des marqueurs
villes.forEach(ville => {
  L.marker(ville.coords).addTo(map).bindPopup(`<b>${ville.nom}</b>`);
});

// 🎵 Musique
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

let audio = new Audio();
const musicTitle = document.getElementById("music-title");
const playButton = document.getElementById("play-button");
const musicSelector = document.getElementById("music-selector");

// Remplir le sélecteur
musiques.forEach((musique, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = musique.titre;
  musicSelector.appendChild(option);
});

function playMusic(index) {
  const selected = musiques[index];
  audio.src = selected.fichier;
  audio.play();
  musicTitle.textContent = `🎵 En cours : ${selected.titre}`;
}

musicSelector.addEventListener("change", () => {
  const index = musicSelector.value;
  playMusic(index);
});

playButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

// 🎮 Menu déroulant ville stylisé (style PS4)
const villeDropdown = document.querySelector('.ville-dropdown');
const villeOptions = document.querySelector('.ville-options');
const villeLabel = document.querySelector('.ville-label');

villeDropdown.addEventListener('click', () => {
  villeDropdown.classList.toggle('open');
});

villeOptions.querySelectorAll('li').forEach((li, index) => {
  li.addEventListener('click', () => {
    villeLabel.textContent = li.textContent;
    villeDropdown.classList.remove('open');
    const selectedVille = villes[index];
    if (selectedVille) {
      map.setView(selectedVille.coords, 14); // Zoom sur la ville sélectionnée
    }
  });
});
