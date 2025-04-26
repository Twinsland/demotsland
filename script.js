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
const musics = [
  'assets/musics/sagbohan1.mp3',
  'assets/musics/kidjo1.mp3',
  'assets/musics/firstking1.mp3'
];

// script.js

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const trackName = document.getElementById('track-name');
    const artistName = document.getElementById('artist-name');

    const tracks = [
        { title: 'Djidjoho', artist: 'Sagbohan Danialou', src: 'assets/musics/sagbohan1.mp3' },
        { title: 'Wombo Lombo', artist: 'Angélique Kidjo', src: 'assets/musics/kidjo1.mp3' },
        { title: 'Bon choix', artist: 'First King', src: 'assets/musics/firstking1.mp3' }
    ];

    let currentTrack = 0;

    function loadTrack(index) {
        const track = tracks[index];
        audio.src = track.src;
        trackName.textContent = track.title;
        artistName.textContent = track.artist;
        playBtn.textContent = '▶'; // Play icon
    }

    function playPause() {
        if (audio.paused) {
            audio.play();
            playBtn.textContent = '❚❚'; // Pause icon
        } else {
            audio.pause();
            playBtn.textContent = '▶'; // Play icon
        }
    }

    function prevTrack() {
        currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrack);
        audio.play();
        playBtn.textContent = '❚❚';
    }

    function nextTrack() {
        currentTrack = (currentTrack + 1) % tracks.length;
        loadTrack(currentTrack);
        audio.play();
        playBtn.textContent = '❚❚';
    }

    playBtn.addEventListener('click', playPause);
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);mkdir project
    cd project
    mkdir data, assets
    cd data
    ni villes.json
    cd ../assets
    mkdir musics

    audio.addEventListener('ended', nextTrack); // Auto enchaînement

    loadTrack(currentTrack); // Initialisation
});
