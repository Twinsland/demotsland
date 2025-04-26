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

// === Gestion Musique ===
const tracks = [
  { name: "Agolo", artist: "Angelique Kidjo", src: "assets/music/kidjo1.mp3" },
  { name: "Bon Choix", artist: "First King", src: "assets/music/firstking1.mp3" }
    { name: "Djidjoho", artist: "Sagbohan Danialou", src: "assets/music/sagbohan1.mp3" }
];

let currentTrackIndex = 0;
const audio = document.getElementById('audio');
const trackName = document.getElementById('track-name');
const artistName = document.getElementById('artist-name');

function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.src;
  trackName.textContent = track.name;
  artistName.textContent = track.artist;
}

document.getElementById('play-btn').addEventListener('click', function() {
  if (audio.paused) {
    audio.play();
    this.textContent = '❚❚'; // bouton pause
  } else {
    audio.pause();
    this.textContent = '▶'; // bouton play
  }
});

document.getElementById('prev-btn').addEventListener('click', function() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  audio.play();
});

document.getElementById('next-btn').addEventListener('click', function() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  audio.play();
});

// Charger la première musique au démarrage
loadTrack(currentTrackIndex);
