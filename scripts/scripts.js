function mostrarTiposTrabajos() {
    let tiposTrabajos = document.getElementById("tiposTrabajos");
    if (tiposTrabajos.style.display === "none" || tiposTrabajos.style.display === "") {
        tiposTrabajos.style.display = "block";
    } else {
        tiposTrabajos.style.display = "none";
    }
}

const img1 = document.querySelector('.img1');
const img2 = document.querySelector('.img2');
const img3 = document.querySelector('.img3');


/**********************************************************************************************/

let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 1500);
}
const tipoUñasHeaders = document.querySelectorAll('.tipo-uñas h3');

tipoUñasHeaders.forEach(header => {
    header.addEventListener('click', function () {
        const tipoUñas = this.parentNode;

        tipoUñas.classList.toggle('active');
    });
});

const tipoCejasHeaders = document.querySelectorAll('.tipo-cejas h3');

tipoCejasHeaders.forEach(header => {
    header.addEventListener('click', function () {
        const tipoCejas = this.parentNode;

        tipoCejas.classList.toggle('active');
    });
});

/**********************************************************************************************/
document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (query.trim() === '') {
        resultsContainer.innerHTML = '<p>Por favor, ingrese un término de búsqueda.</p>';
        return;
    }

    fetch('../scripts/search_index.json')
        .then(response => response.json())
        .then(data => {
            let found = false;
            data.forEach(page => {
                if (page.content.toLowerCase().includes(query) || page.title.toLowerCase().includes(query)) {
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('result-item');
                    resultItem.innerHTML = `<a href="${page.url}">${page.title}</a><p>${page.content.substring(0, 100)}...</p>`;
                    resultsContainer.appendChild(resultItem);
                    found = true;
                }
            });

            if (!found) {
                resultsContainer.innerHTML = '<p>No se encontraron coincidencias.</p>';
            }
        })
        .catch(error => {
            console.error('Error al cargar el índice de búsqueda:', error);
            resultsContainer.innerHTML = '<p>Error al realizar la búsqueda. Por favor, inténtelo de nuevo más tarde.</p>';
        });
});