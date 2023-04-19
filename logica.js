const digimonTable = document.getElementById("digimon-table");
const toggleBtn = document.getElementById("toggle-table");
const searchForm = document.querySelector("form[role='search']");


// Obtener los datos de la API y crear la tabla
fetch("https://digimon-api.vercel.app/api/digimon")
    .then(response => response.json())
    .then(data => {
        data.forEach(digimon => {
            const row = document.createElement("tr");
            const nameCell = document.createElement("td");
            const imgCell = document.createElement("td");
            const levelCell = document.createElement("td");
            const linkCell = document.createElement("td");

            nameCell.textContent = digimon.name;
            imgCell.innerHTML = `<img src="${digimon.img}" alt="${digimon.name}" width="40" height="40">`;
            levelCell.textContent = digimon.level;

            const link = document.createElement("a");
            link.textContent = "Ver detalles";
           link.href = `index2.html?id=${digimon.id}`;
            link.classList.add("btn", "btn-primary", "btn-sm");

            linkCell.appendChild(link);

            row.appendChild(nameCell);
            row.appendChild(imgCell);
            row.appendChild(levelCell);
            row.appendChild(linkCell);

            digimonTable.querySelector("tbody").appendChild(row);
        });
    })
    .catch(error => console.error(error));

// Evento para mostrar/ocultar la tabla
toggleBtn.addEventListener("click", () => {
    digimonTable.classList.toggle("d-none");
    if (toggleBtn.textContent === "Ocultar tabla Digimon") {
        toggleBtn.textContent = "Mostrar tabla Digimon";
    } else {
        toggleBtn.textContent = "Ocultar tabla Digimon";
    }
});


// Funcion para realizar la busqueda

const searchTable = () => {
    const searchInput = document.getElementById("search-input");
    const searchTerm = searchInput.value.toLowerCase().trim();
    const rows = document.querySelectorAll("#digimon-table tbody tr");
    let numResults = 0;

    rows.forEach(row => {
        const name = row.querySelector("td:first-child").textContent.toLowerCase();
        if (name.includes(searchTerm)) {
            row.classList.remove("d-none");
            numResults++;
        } else {
            row.classList.add("d-none");
        }
    });

    const searchResults = document.getElementById("search-results");
    if (numResults === 1) {
        searchResults.textContent = `${numResults} resultado de búsqueda`;
    } else {
        searchResults.textContent = `${numResults} resultados de búsqueda`;
    }
};

const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", searchTable);

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchTable();
    }
});


// Función para mostrar detalles de un Digimon
const showDigimonDetails = name => {
    fetch(`https://digimon-api.vercel.app/api/digimon/name/${name}`)
        .then(response => response.json())
        .then(data => {
            const digimon = data[0];
            const modalTitle = document.getElementById("modal-title");
            const modalBody = document.getElementById("modal-body");

            modalTitle.textContent = digimon.name;

            modalBody.innerHTML = `
          <div class="card">
            <img src="${digimon.img}" class="card-img-top" alt="${digimon.name}">
            <div class="card-body">
              <h5 class="card-title">${digimon.name}</h5>
              <p class="card-text"><strong>Nivel:</strong> ${digimon.level}</p>     
            </div>
          </div>
        `;

            $("#digimon-modal").modal("show");
        })
        .catch(error => console.error(error));
};
