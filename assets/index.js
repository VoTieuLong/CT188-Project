// SHOW BAR
function toggleNav() {
    const nav = document.getElementById("headerNav");
    nav.classList.toggle("show");
}
// SLIDEDR
const slides = document.querySelectorAll(".slides img");
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider(){
    if(slides.length > 0){
        slides[slideIndex].classList.add("displaySlide");
        intervalId = setInterval(nextSlide, 5000);
    }
}

function showSlide(index){
    if(index >= slides.length){
        slideIndex = 0;
    }
    else if(index < 0){
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });
    slides[slideIndex].classList.add("displaySlide");
}

function prevSlide(){
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide(){
    slideIndex++;
    showSlide(slideIndex);
}

// TIN TỨC
const newsSlides = document.querySelectorAll('.tin-tuc .infor');
let newsSlideIndex = 0;
let newsIntervalId = null;

document.addEventListener("DOMContentLoaded", initializeNewsSlider);

function initializeNewsSlider() {
    if (newsSlides.length > 0) {
        newsSlides[newsSlideIndex].classList.add("active");
        newsIntervalId = setInterval(nextNewsSlide, 5000);
    }
}

function showNewsSlide(index) {
    if (index >= newsSlides.length) {
        newsSlideIndex = 0;
    } else if (index < 0) {
        newsSlideIndex = newsSlides.length - 1;
    }

    newsSlides.forEach((slide) => {
        slide.classList.remove("active");
    });
    newsSlides[newsSlideIndex].classList.add("active");
}

function prevNewsSlide() {
    clearInterval(newsIntervalId);
    newsSlideIndex--;
    showNewsSlide(newsSlideIndex);
}

function nextNewsSlide() {
    newsSlideIndex++;
    showNewsSlide(newsSlideIndex);
}

