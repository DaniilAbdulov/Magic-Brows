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
