// Les données des villes
const villes = [
  {
    nom: "Cotonou",
    image: "assets/images/cotonou.jpg",
    description: "Capitale économique du Bénin, dynamique et vibrante.",
  },
  {
    nom: "Parakou",
    image: "assets/images/parakou.jpg",
    description: "Centre commercial majeur du nord du Bénin.",
  },
  {
    nom: "Porto-Novo",
    image: "assets/images/porto-novo.jpg",
    description: "Capitale administrative, riche en culture et en histoire.",
  },
  {
    nom: "Abomey-Calavi",
    image: "assets/images/abomey-calavi.jpg",
    description: "Ville universitaire en plein essor proche de Cotonou.",
  }
];

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

// Initialisation
let villeIndex = 0;
let musiqueIndex = 0;

// Sélection des éléments HTML
const mapElement = document.getElementById('map');
const villeSelect = document.getElementById('ville-select');
const audioElement = document.getElementById('audio');
const playerInfo = document.getElementById('player-info');

// Remplir la liste déroulante des villes
villes.forEach((ville, index) => {
  const option = document.createElement('option');
  option.value = index;
  option.textContent = ville.nom;
  villeSelect.appendChild(option);
});

// Changer la ville affichée
function changerVille(index) {
  const ville = villes[index];
  mapElement.style.backgroundImage = `url('${ville.image}')`;
  mapElement.style.backgroundSize = 'cover';
  mapElement.style.backgroundPosition = 'center';
  mapElement.innerHTML = `
    <h2>${ville.nom}</h2>
    <p>${ville.description}</p>
  `;
}

// Contrôles musique
function jouerMusique() {
  audioElement.src = musiques[musiqueIndex].fichier;
  playerInfo.textContent = musiques[musiqueIndex].titre;
  audioElement.play();
}

function musiqueSuivante() {
  musiqueIndex = (musiqueIndex + 1) % musiques.length;
  jouerMusique();
}

function musiquePrecedente() {
  musiqueIndex = (musiqueIndex - 1 + musiques.length) % musiques.length;
  jouerMusique();
}

// Événements
villeSelect.addEventListener('change', (e) => {
  villeIndex = e.target.value;
  changerVille(villeIndex);
});

document.getElementById('prev-button').addEventListener('click', musiquePrecedente);
document.getElementById('next-button').addEventListener('click', musiqueSuivante);

// Démarrage
changerVille(0);
jouerMusique();
