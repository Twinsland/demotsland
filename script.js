// Villes avec coordonnées (à ajuster selon ton image)
const villes = [
  { nom: "Cotonou", x: 60, y: 85 },
  { nom: "Parakou", x: 45, y: 40 },
  { nom: "Porto-Novo", x: 68, y: 90 },
  { nom: "Abomey-Calavi", x: 58, y: 80 }
];

// Musiques
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

// Menu musique
const lecteur = document.getElementById('lecteurMusique');
const titreMusique = document.getElementById('titreMusique');

let index = 0;

function jouerMusique(i) {
  const musique = musiques[i];
  lecteur.src = musique.fichier;
  titreMusique.textContent = `🎵 ${musique.titre}`;
  lecteur.play();
}

titreMusique.addEventListener('click', () => {
  jouerMusique(index);
  index = (index + 1) % musiques.length;
});
