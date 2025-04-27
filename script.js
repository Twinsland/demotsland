document.addEventListener("DOMContentLoaded", function() {
    const map = L.map('map').setView([7.5, 2.5], 7);

    // Chargement du fond de carte OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Chargement des frontières du Bénin
    fetch('data/benin.geojson')
        .then(response => response.json())
        .then(beninBorders => {
            L.geoJSON(beninBorders, {
                style: {
                    color: 'gold',
                    weight: 3,
                    fillOpacity: 0
                }
            }).addTo(map);
        })
        .catch(error => console.error('Erreur chargement frontières Bénin :', error));

    // Chargement des limites des départements
    fetch('data/departements_benin.geojson')
        .then(response => response.json())
        .then(departements => {
            L.geoJSON(departements, {
                style: {
                    color: 'gold',
                    weight: 2,
                    fillOpacity: 0
                }
            }).addTo(map);
        })
        .catch(error => console.error('Erreur chargement départements :', error));

    // Définition du marqueur doré pour Cotonou
    const goldIcon = L.icon({
        iconUrl: 'assets/images/gold-marker.png', // Ton image de marqueur doré
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        shadowSize: [41, 41]
    });

    // Chargement des villes
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

                // Ajout du marker avec icône dorée pour Cotonou
                const marker = ville.nom === "Cotonou" 
                    ? L.marker([ville.lat, ville.lng], { icon: goldIcon }).addTo(map)
                    : L.marker([ville.lat, ville.lng]).addTo(map);

                marker.bindPopup(`
                    <div style="text-align: center;">
                        <img src="${ville.image}" alt="${ville.nom}" style="width: 100%; height: auto; border-radius: 10px; margin-bottom: 10px;">
                        <b>${ville.nom}</b><br>${ville.description}
                    </div>
                `);
            });

            // Centrage sur la sélection de la ville
            select.addEventListener("change", function() {
                if (this.value) {
                    const coords = JSON.parse(this.value);
                    map.setView([coords.lat, coords.lng], 13);
                } else {
                    map.setView([7.5, 2.5], 7); // Retour vue générale
                }
            });
        })
        .catch(error => {
            console.error("Erreur lors du chargement des villes :", error);
        });
});

// Partie Musique
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
    const playerInfoSpan = document.querySelector('.player-info span');

    let currentTrack = 0;
playerInfoSpan.textContent = `${tracks[currentTrackIndex].artist} - ${tracks[currentTrackIndex].title}`;

    function loadTrack(index) {
        const track = tracks[index];
        audio.src = track.src;
        trackName.textContent = track.title;
        artistName.textContent = track.artist;
        playBtn.textContent = '▶'; // Icône Play
    }

    function playPause() {
        if (audio.paused) {
            audio.play();
            playBtn.textContent = '❚❚'; // Icône Pause
        } else {
            audio.pause();
            playBtn.textContent = '▶'; // Icône Play
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
        if (currentTrackIndex >= tracks.length) {
        currentTrackIndex = 0; // revenir au début si fin de playlist

    playBtn.addEventListener('click', playPause);
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);

    audio.addEventListener('ended', nextTrack); // Enchaînement auto

    loadTrack(currentTrack); // Chargement initial
});

playerInfoSpan.textContent = `${tracks[currentTrackIndex].artist} - ${tracks[currentTrackIndex].title}`;
    // Ici tu peux aussi changer le src de ton audio
}
