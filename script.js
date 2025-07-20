// Villes avec coordonnées (à ajuster selon ton image)
const villes = [
  { nom: "Cotonou", x: 60, y: 85 },
  { nom: "Parakou", x: 45, y: 40 },
  { nom: "Porto-Novo", x: 68, y: 90 },
  { nom: "Abomey-Calavi", x: 58, y: 80 }
];

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
  musicTitle.textContent = 🎵 En cours : ${selected.titre};
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

// Affichage des marqueurs
const villeMarkersContainer = document.getElementById('villeMarkers');
const map = document.getElementById('beninMap');

villes.forEach(ville => {
  const marker = document.createElement('div');
  marker.className = 'marker';
  marker.style.left = ville.x + '%';
  marker.style.top = ville.y + '%';
  marker.setAttribute('data-name', ville.nom);
  villeMarkersContainer.appendChild(marker);
});

// Menu déroulant des villes
const dropdown = document.getElementById('villeDropdown');
const optionsList = document.getElementById('villeOptions');

dropdown.addEventListener('click', () => {
  dropdown.classList.toggle('open');
});

villes.forEach(ville => {
  const option = document.createElement('li');
  option.textContent = ville.nom;
  option.addEventListener('click', () => {
    alert("Vous avez sélectionné : " + ville.nom);
    dropdown.classList.remove('open');
  });
  optionsList.appendChild(option);
});
