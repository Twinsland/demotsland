const select = document.getElementById("ville-select");
const carte = document.getElementById("carte");

fetch('./data/villes.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(ville => {
      const option = document.createElement("option");
      option.value = ville.nom;
      option.textContent = ville.nom;
      select.appendChild(option);
    });

    select.addEventListener("change", () => {
      const villeChoisie = data.find(v => v.nom === select.value);
      if (villeChoisie) {
        carte.innerHTML = `
          <strong>${villeChoisie.nom}</strong><br>
          Population: ${villeChoisie.population}<br>
          Description: ${villeChoisie.description}
        `;
      } else {
        carte.textContent = "Sélectionnez une ville pour voir les détails.";
      }
      
      let map;

...

if (map) {
  map.remove();
}
map = L.map('map')...

}

const map = L.map('map').setView([villeChoisie.lat, villeChoisie.lng], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.marker([villeChoisie.lat, villeChoisie.lng])
  .addTo(map)
  .bindPopup(`<b>${villeChoisie.nom}</b><br>${villeChoisie.description}`)
  .openPopup();

    });
  })
  .catch(error => {
    carte.textContent = "Erreur de chargement des données.";
    console.error(error);
  });
const musics = [
  'assets/musics/sagbohan1.mp3',
  'assets/musics/kidjo1.mp3',
  'assets/musics/firstking1.mp3'
];

// script.js
document.addEventListener("DOMContentLoaded", function() {
    const map = L.map('map').setView([7.5, 2.5], 7); // Centré sur le Bénin

    // Ajouter le fond de carte (tiles)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Charger villes.json
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
                // Ajouter une option dans le select
                const option = document.createElement("option");
                option.value = JSON.stringify({ lat: ville.lat, lng: ville.lng });
                option.textContent = ville.nom;
                select.appendChild(option);

                // Ajouter un marker sur la carte
                const marker = L.marker([ville.lat, ville.lng]).addTo(map);
                marker.bindPopup(`<b>${ville.nom}</b><br>${ville.description}`);
            });

            // Quand on choisit une ville dans le menu
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
