"use strict";

//constants

const wrap = document.querySelector(".wrapper");
const pop = document.querySelector(".popUp");
pop.style.display = "none";
const btn = document.getElementById("popbtn");
const content = document.querySelector(".body__content");
const loader = document.querySelector(".body__loader");
loader.style.display = "block";
content.style.display = "none";

const question = document.querySelector(".question");
const qButton = document.getElementById("questionButton");

// Ждем загрузки всех ресурсов
window.addEventListener("load", function () {
    loader.style.display = "none";
    question.style.display = "flex";
    qButton.addEventListener("click", function () {
        question.style.display = "none";
        content.style.display = "block";
        const swiper = new Swiper(".mySwiper", {
            effect: "coverflow",
            loop: true,
            speed: 1000,
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            coverflowEffect: {
                depth: 100,
                modifier: 1,
                rotate: 50,
                slideShadows: false,
                stretch: 0,
            },
        });
        new WOW().init();
        gsap.from(".full-screen__title", { opacity: 0, delay: 0.5, y: 60 });
    });
});
