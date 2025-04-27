// Partie Carte
document.addEventListener("DOMContentLoaded", function() {
  const map = L.map('map').setView([7.5, 2.5], 7);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

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

  const goldIcon = L.icon({
    iconUrl: 'assets/images/gold-marker.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  fetch("data/villes.json")
    .then(response => {
      if (!response.ok) throw new Error("Erreur de chargement du fichier villes.json");
      return response.json();
    })
    .then(villes => {
      const select = document.getElementById("ville-select");

      villes.forEach(ville => {
        const option = document.createElement("option");
        option.value = JSON.stringify({ lat: ville.lat, lng: ville.lng });
        option.textContent = ville.nom;
        select.appendChild(option);

        const marker = ville.nom === "Cotonou"
  ? L.marker([ville.lat, ville.lng], { icon: goldIcon })
  : L.marker([ville.lat, ville.lng]);

marker.addTo(map).bindPopup(`
  <div style="text-align: center;">
    <img src="${ville.image}" alt="${ville.nom}" style="width: 100%; height: auto; border-radius: 10px; margin-bottom: 10px;">
    <b>${ville.nom}</b><br>${ville.description}
  </div>
`);

marker.on('click', function() {
  triggerFlash(); // ← Ajoute ici aussi
});


      select.addEventListener("change", function() {
  if (this.value) {
    const coords = JSON.parse(this.value);
    map.setView([coords.lat, coords.lng], 13);
    triggerFlash(); // ← Ajoute ici
  } else {
    map.setView([7.5, 2.5], 7);
  }
});

      });
    })
    .catch(error => console.error("Erreur lors du chargement des villes :", error));
});

// Partie Musique
document.addEventListener("DOMContentLoaded", function() {
  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('play-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const trackName = document.getElementById('track-name');
  const artistName = document.getElementById('artist-name');
  const musicPlayer = document.querySelector('.music-player');

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
    playBtn.textContent = '▶';
  }

  function playPause() {
    if (audio.paused) {
      audio.play();
      playBtn.textContent = '❚❚';
    } else {
      audio.pause();
      playBtn.textContent = '▶';
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

  // Lancer musique automatique au démarrage
  loadTrack(currentTrack);
  audio.volume = 0.5; // Volume bas par défaut
  audio.play().catch(err => console.log('Lecture auto bloquée par navigateur.', err));

  playBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    playPause();
  });
  prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    prevTrack();
  });
  nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    nextTrack();
  });

  audio.addEventListener('ended', nextTrack);

  // Ouvrir/Fermer lecteur
  musicPlayer.addEventListener('click', () => {
    musicPlayer.classList.toggle('open');
  });
});

// Fonction pour déclencher un flash
function triggerFlash() {
  const flash = document.getElementById('flash');
  flash.style.display = 'block';
  flash.classList.remove('flash-effect'); // reset
  void flash.offsetWidth; // trick pour re-déclencher l'animation
  flash.classList.add('flash-effect');
  setTimeout(() => {
    flash.style.display = 'none';
  }, 500); // cacher après animation
}

function triggerFlash() {
  const flash = document.createElement('div');
  flash.className = 'flash-effect';
  document.body.appendChild(flash);
  setTimeout(() => {
    flash.remove();
  }, 500); // Temps identique à l'animation
}
