document.addEventListener("DOMContentLoaded", function() {
    const map = L.map('map').setView([7.5, 2.5], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    fetch("data/villes.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur de chargement du fichier villes.json");
            }
            return response.json();
        })
        .then(villes => {
            const select = document.getElementById("ville-select");

            villes.forEach(ville => {
                
                const option = document.createElement("option");
                option.value = JSON.stringify({ lat: ville.lat, lng: ville.lng });
                option.textContent = ville.nom;
                select.appendChild(option);

                const marker = L.marker([ville.lat, ville.lng]).addTo(map);
                marker.bindPopup(`<b>${ville.nom}</b><br>${ville.description}`);
            });
            
            select.addEventListener("change", function() {
                if (this.value) {
                    const coords = JSON.parse(this.value);
                    map.setView([coords.lat, coords.lng], 13);
                }
            });
        })
        .catch(error => {
            console.error("Erreur lors du chargement des villes :", error);
        });
});


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

let villeIndex = 0;
let musiqueIndex = 0;

const mapElement = document.getElementById('map');
const villeSelect = document.getElementById('ville-select');
const audioElement = document.getElementById('audio');
const playerInfo = document.getElementById('player-info');

villes.forEach((ville, index) => {
  const option = document.createElement('option');
  option.value = index;
  option.textContent = ville.nom;
  villeSelect.appendChild(option);
});

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

villeSelect.addEventListener('change', (e) => {
  villeIndex = e.target.value;
  changerVille(villeIndex);
});

document.getElementById('prev-button').addEventListener('click', musiquePrecedente);
document.getElementById('next-button').addEventListener('click', musiqueSuivante);

changerVille(0);
jouerMusique();
