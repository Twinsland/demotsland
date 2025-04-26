// Chargement des données des villes
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("ville-select");
  const carte = document.getElementById("carte");
  let map; // Carte Leaflet à initialiser plus tard

  fetch("data/villes.json")
    .then((response) => response.json())
    .then((data) => {
      // Remplir le menu déroulant avec les villes
      data.forEach((ville) => {
        const option = document.createElement("option");
        option.value = ville.nom;
        option.textContent = ville.nom;
        select.appendChild(option);
      });

      // Écoute de la sélection de ville
      select.addEventListener("change", () => {
        const villeChoisie = data.find((v) => v.nom === select.value);

        if (villeChoisie) {
          // Afficher les infos de la ville
          carte.innerHTML = `
            <strong>${villeChoisie.nom}</strong><br>
            Population : ${villeChoisie.population}<br>
            Description : ${villeChoisie.description}
          `;

          // Supprimer la carte précédente si elle existe
          if (map) {
            map.remove();
          }

          // Initialiser la nouvelle carte
          map = L.map("map").setView([villeChoisie.lat, villeChoisie.lng], 13);

          // Ajouter les tuiles OpenStreetMap
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
          }).addTo(map);

          // Ajouter un marqueur pour la ville
          L.marker([villeChoisie.lat, villeChoisie.lng])
            .addTo(map)
            .bindPopup(`<b>${villeChoisie.nom}</b><br>${villeChoisie.description}`)
            .openPopup();
        } else {
          carte.textContent = "Sélectionnez une ville pour voir les détails.";
        }
      });
    })
    .catch((error) => {
      carte.textContent = "Erreur de chargement des données.";
      console.error(error);
    });

  // 🎵 Musique - configuration du lecteur
  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("play-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const trackName = document.getElementById("track-name");
  const artistName = document.getElementById("artist-name");

  const tracks = [
    { title: "Djidjoho", artist: "Sagbohan Danialou", src: "assets/musics/sagbohan1.mp3" },
    { title: "Wombo Lombo", artist: "Angélique Kidjo", src: "assets/musics/kidjo1.mp3" },
    { title: "Bon choix", artist: "First King", src: "assets/musics/firstking1.mp3" },
  ];

  let currentTrack = 0;

  function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    trackName.textContent = track.title;
    artistName.textContent = track.artist;
    playBtn.textContent = "▶";
  }

  function playPause() {
    if (audio.paused) {
      audio.play();
      playBtn.textContent = "❚❚";
    } else {
      audio.pause();
      playBtn.textContent = "▶";
    }
  }

  function prevTrack() {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    audio.play();
    playBtn.textContent = "❚❚";
  }

  function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    audio.play();
    playBtn.textContent = "❚❚";
  }

  playBtn.addEventListener("click", playPause);
  prevBtn.addEventListener("click", prevTrack);
  nextBtn.addEventListener("click", nextTrack);
  audio.addEventListener("ended", nextTrack);

  loadTrack(currentTrack); // Charge la première piste au lancement
});
