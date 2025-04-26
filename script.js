document.addEventListener("DOMContentLoaded", function() {
    const villesContainer = document.getElementById("villes-container");

    // Charger villes.json dynamiquement
    fetch("data/villes.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur de chargement du fichier villes.json");
            }
            return response.json();
        })
        .then(villes => {
            villes.forEach(ville => {
                const villeCard = document.createElement("div");
                villeCard.classList.add("ville-card");

                villeCard.innerHTML = `
                    <img src="${ville.image}" alt="${ville.nom}">
                    <div class="ville-card-body">
                        <h3>${ville.nom}</h3>
                        <p>${ville.description}</p>
                    </div>
                `;

                villesContainer.appendChild(villeCard);
            });
        })
        .catch(error => {
            console.error("Erreur lors du chargement des villes :", error);
            villesContainer.innerHTML = "<p>Impossible de charger les villes.</p>";
        });
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
