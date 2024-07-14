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
