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

// Références DOM
const lecteur = document.querySelector(".music-player");
const audio = lecteur.querySelector("audio");
const titre = lecteur.querySelector(".music-title");
const playBtn = lecteur.querySelector(".play");
const prevBtn = lecteur.querySelector(".prev");
const nextBtn = lecteur.querySelector(".next");

let indexMusique = 0;

// Charger la musique
function chargerMusique(index) {
  audio.src = musiques[index].fichier;
  titre.textContent = musiques[index].titre;
}

// Lecture/pause
function toggleLecture() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
}

// Musique précédente
function musiquePrecedente() {
  indexMusique = (indexMusique - 1 + musiques.length) % musiques.length;
  chargerMusique(indexMusique);
  audio.play();
  playBtn.textContent = "⏸️";
}

// Musique suivante
function musiqueSuivante() {
  indexMusique = (indexMusique + 1) % musiques.length;
  chargerMusique(indexMusique);
  audio.play();
  playBtn.textContent = "⏸️";
}

// Contrôles
playBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleLecture();
});

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  musiquePrecedente();
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  musiqueSuivante();
});

// Ouverture/fermeture du lecteur
lecteur.addEventListener("click", () => {
  lecteur.classList.toggle("open");
});

// Initialisation au chargement
window.addEventListener("DOMContentLoaded", () => {
  chargerMusique(indexMusique);
});
