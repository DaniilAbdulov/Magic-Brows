//скрытие линии бургера
const h = document.documentElement.clientHeight;
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
