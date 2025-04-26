document.addEventListener("DOMContentLoaded", function() {
    const map = L.map('map').setView([7.5, 2.5], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    let villesData = []; // On va garder les villes ici

    fetch("data/villes.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur de chargement du fichier villes.json");
            }
            return response.json();
        })
        .then(villes => {
            villesData = villes; // On garde les villes en mémoire
            const select = document.getElementById("ville-select");

            // Ajout d'une option vide pour "Choisissez une ville"
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            select.appendChild(defaultOption);

            villes.forEach(ville => {
                const option = document.createElement("option");
                option.value = JSON.stringify({ lat: ville.lat, lng: ville.lng });
                option.textContent = ville.nom;
                select.appendChild(option);

                const marker = L.marker([ville.lat, ville.lng]).addTo(map);

                // Ajout d'un badge Premium si la ville est Cotonou
                let premiumBadge = "";
                if (ville.nom.toLowerCase() === "cotonou") {
                    premiumBadge = `<br><span style="color: gold; font-weight: bold;">🏆 Ville Premium</span>`;
                }

                marker.bindPopup(`
                    <div style="text-align: center;">
                        <img src="${ville.image}" alt="${ville.nom}" style="width: 100%; height: auto; border-radius: 10px; margin-bottom: 10px;">
                        <b>${ville.nom}</b><br>${ville.description}
                        ${premiumBadge}
                    </div>
                `);
            });

            select.addEventListener("change", function() {
                if (this.value) {
                    const coords = JSON.parse(this.value);
                    map.setView([coords.lat, coords.lng], 13);
                } else {
                    // Si aucune ville sélectionnée, on réaffiche tout le pays
                    map.setView([7.5, 2.5], 7);
                }
            });
        })
        .catch(error => {
            console.error("Erreur lors du chargement des villes :", error);
        });

    // Musiques
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
    nextBtn.addEventListener('click', nextTrack);

    audio.addEventListener('ended', nextTrack); // Auto enchaînement

    loadTrack(currentTrack); // Initialisation
});
