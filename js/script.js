"use strict";

//constants
const h = document.documentElement.clientHeight;
const wrap = document.querySelector(".wrapper");
const pop = document.querySelector(".popUp");
pop.style.display = "none";
const btn = document.getElementById("popbtn");
const content = document.querySelector(".body__content");
const loader = document.querySelector(".body__loader");
loader.style.display = "block";
content.style.display = "none";

// Ждем загрузки всех ресурсов
window.addEventListener("load", function () {
    loader.style.display = "none";
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
    gsap.from(".full-screen__text", { opacity: 0, delay: 1, y: -60 });
});
//время в форме
const dateControl = document.querySelector('input[type="datetime-local"]');
const today = new Date();
const timezoneOffset = today.getTimezoneOffset();
const now = new Date(today.getTime() - timezoneOffset * 60 * 1000)
    .toISOString()
    .slice(0, 16);
dateControl.value = now;
dateControl.min = now;
//отправка формы
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const load = document.getElementById("load");
    form.addEventListener("submit", formSend);

    function formSend(e) {
        e.preventDefault();

        const error = formValidate(form);

        if (error === 0) {
            load.classList.add("_sending");
            fetch("sendmail.v2.php", {
                method: "POST",
                body: new FormData(form),
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Network response was not ok.");
                    }
                })
                .then((result) => {
                    wrap.style.opacity = 0.1;
                    pop.style.display = "flex";

                    btn.addEventListener("click", hidePopUp);
                    function hidePopUp() {
                        wrap.style.opacity = 1;
                        pop.style.display = "none";
                    }
                    form.reset();
                    load.classList.remove("_sending");
                })
                .catch((error) => {
                    alert(error.message);
                    load.classList.remove("_sending");
                });
        } else {
            alert("В подсвеченном поле некорректные данные");
        }
    }

    function formValidate(form) {
        let error = 0;
        const formReq = form.querySelectorAll("._req");

        formReq.forEach((input) => {
            formRemoveError(input);

            if (input.classList.contains("_name")) {
                if (nameTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.classList.contains("_telephone")) {
                if (telephoneTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === "") {
                    formAddError(input);
                    error++;
                }
            }
        });

        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add("_error");
        input.classList.add("_error");
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove("_error");
        input.classList.remove("_error");
    }

    function nameTest(input) {
        return !/^[^[\].,_'"@?!:$/\\]*[А-Яа-я]/.test(input.value);
    }

    function telephoneTest(input) {
        return !/^([^\d]*?\d){10,15}$/.test(input.value);
    }
});

const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle("_lock");
        iconMenu.classList.toggle("_active");
        menuBody.classList.toggle("_active");
    });
}

const menuLinks = document.querySelectorAll(".menu__link[data-goto]");
const touch = document.getElementById("touch");
if (menuLinks.length > 0) {
    menuLinks.forEach((menuLink) => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (
            menuLink.dataset.goto &&
            document.querySelector(menuLink.dataset.goto)
        ) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue =
                gotoBlock.getBoundingClientRect().top +
                scrollY -
                document.querySelector("header").offsetHeight;
            if (iconMenu.classList.contains("_active")) {
                document.body.classList.remove("_lock");
                iconMenu.classList.remove("_active");
                menuBody.classList.remove("_active");
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth",
            });
            e.preventDefault();
        }
    }
}

if (window.innerWidth < 767) {
    document.body.classList.add("_touch");
    touch.addEventListener("click", function () {
        touch.classList.toggle("_active");
        setTimeout(function () {
            touch.classList.remove("_active");
        }, 5000);
    });
} else {
    document.body.classList.add("_pc");
}

//=====================
//скрытие линии бургера
const header = document.querySelector(".header");
let isAnimated = false; // флаг, чтобы не запускать анимацию во время выполнения предыдущей

document.addEventListener("scroll", function () {
    let location = ((scrollY / h) * 100).toFixed(2);
    if (location > 6) {
        if (!isAnimated) {
            requestAnimationFrame(function () {
                header.style.transition = "background-color 0.3s ease-in-out";
                header.style.backgroundColor = "#121212";
                isAnimated = false;
            });
        }
    } else if (document.body.scrollTop == 0) {
        if (!isAnimated) {
            requestAnimationFrame(function () {
                header.style.transition = "background-color 0.3s ease-in-out";
                header.style.backgroundColor = "";
                isAnimated = false;
            });
        }
    } else {
        if (!isAnimated) {
            requestAnimationFrame(function () {
                header.style.transition = "background-color 0.3s ease-in-out";
                header.style.backgroundColor = "none";
                isAnimated = false;
            });
        }
    }
});

//мониторинг нажатия на ссылку в телеграмм
function sendTelegramNotification() {
    var url =
        "https://api.telegram.org/bot6065542648:AAG04VyT6ZkSbrtH_7B9sAHfxk4WuOAHC88/sendMessage";
    var message = "Кто-то нажал на ссылку с сайта magicbrows.ru";
    var chatId = "6099379205";
    const data = new URLSearchParams();
    data.append("chat_id", chatId);
    data.append("text", message);

    fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: data,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Ошибка при отправке сообщения в Telegram.");
            }
            console.log("Сообщение успешно отправлено в Telegram.");
        })
        .catch((error) => {
            console.error(error);
        });
}
