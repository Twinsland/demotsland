// Initialisation de la carte centrée sur le Bénin
const map = L.map('map').setView([9.3077, 2.3158], 7);

// Ajout du fond de carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Icône dorée spéciale pour Cotonou (par exemple)
const goldIcon = L.icon({
  iconUrl: 'assets/images/gold-marker.png',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40]
});

// Fonction de flash visuel sur la carte
function triggerFlash() {
  const flash = document.createElement('div');
  flash.className = 'flash';
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 600);
}

// Script pour gérer le menu cascade
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById('ville-menu-toggle');
  const villeList = document.getElementById('ville-list');
  const menuContainer = document.getElementById('ville-menu-container');

  // Ouverture/Fermeture du menu ville
  menuToggle.addEventListener('click', () => {
    menuContainer.classList.toggle('open');
  });

  // Chargement dynamique des villes depuis le fichier JSON
  fetch("data/villes.json")
    .then(response => response.json())
    .then(villes => {
      villes.forEach(ville => {
        // Création de l’élément de menu
        const li = document.createElement('li');
        li.textContent = ville.nom;

        // Clic sur la ville → recentrer + flash + fermer le menu
        li.addEventListener('click', () => {
          map.setView([ville.lat, ville.lng], 13);
          triggerFlash();
          menuContainer.classList.remove('open');
        });

        // Ajout au menu
        villeList.appendChild(li);

        // Ajout du marqueur sur la carte
        const icon = ville.nom === "Cotonou" ? goldIcon : undefined;
        L.marker([ville.lat, ville.lng], { icon: icon })
          .addTo(map)
          .bindPopup(`
            <div style="text-align: center;">
              <img src="${ville.image}" alt="${ville.nom}" style="width: 100%; border-radius: 10px; margin-bottom: 10px;">
              <b>${ville.nom}</b><br>${ville.description}
            </div>
          `)
          .on('click', triggerFlash);
      });
    })
    .catch(error => {
      console.error("Erreur de chargement des villes :", error);
    });
});
