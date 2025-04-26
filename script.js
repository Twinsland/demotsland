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
