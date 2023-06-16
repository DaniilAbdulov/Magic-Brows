'use strict'
const wrap = document.querySelector('.wrapper');
const pop = document.querySelector('.popUp');
pop.style.display = 'none';
const btn = document.getElementById('popbtn');


document.body.style.display = 'none';
var loader = document.createElement('div');
loader.style.display = 'block';
loader.innerText = 'Loading...';
document.body.appendChild(loader);

// Ждем загрузки всех ресурсов
window.addEventListener('load', function() {
  // Скрываем прелоадер и показываем содержимое сайта
  loader.style.display = 'none';
  document.body.style.display = 'block';

  // Инициализируем Swiper и WOW.js
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
  gsap.from('.full-screen__title', {opacity:0, delay:0.5,y:30})
  gsap.from('.full-screen__text', {opacity:0, delay:1,y:-30})
});



const dateControl = document.querySelector('input[type="datetime-local"]'); 
const now = new Date().toISOString().slice(0, 16); 
dateControl.value = now; 
dateControl.min = now;




document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  const load = document.getElementById('load');
  form.addEventListener('submit', formSend);

  function formSend(e) {
    e.preventDefault();

    const error = formValidate(form);

    if (error === 0) {
      load.classList.add('_sending');
      fetch('sendmail.php', {
        method: 'POST',
        body: new FormData(form)
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {

            throw new Error('Network response was not ok.');
          }
        })
        .then(result => {
          wrap.style.opacity = 0.1;
          pop.style.scale = '1';
    
          btn.addEventListener('click', hidePopUp);
          function hidePopUp(){
            wrap.style.opacity = 1;
            pop.style.scale = '0'
          }
          form.reset();
          load.classList.remove('_sending');
        })
        .catch(error => {
          alert(error.message);
          load.classList.remove('_sending');
        });
    } else {


      alert('В подсвеченном поле некорректные данные');
    }
  }

  function formValidate(form) {
    let error = 0;
    const formReq = form.querySelectorAll('._req');

    formReq.forEach(input => {
      formRemoveError(input);

      if (input.classList.contains('_name')) {
        if (nameTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.classList.contains('_telephone')) {
        if (telephoneTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    });

    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }

  function nameTest(input) {
    return !(/^[^[\].,_'"@?!:$/\\]*[А-Яа-я]/.test(input.value));
  }

  function telephoneTest(input) {
    return !(/^([^\d]*?\d){10,15}$/.test(input.value));
  }
});



const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if(iconMenu){
  iconMenu.addEventListener('click', function(e){
    document.body.classList.toggle('_lock')
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  })
}


const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
const touch = document.getElementById('touch');
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener('click', onMenuLinkClick);
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
        document.querySelector('header').offsetHeight;
      if(iconMenu.classList.contains('_active')){
        document.body.classList.remove('_lock')
        iconMenu.classList.remove('_active');
        menuBody.classList.remove('_active');
      }
      
      window.scrollTo({
        top: gotoBlockValue,
        behavior: 'smooth',
      });
      e.preventDefault();
    }
  }
}



if (window.innerWidth < 767) { 
  document.body.classList.add('_touch');
  touch.addEventListener('click', function(){
    touch.classList.toggle('_active')
    setTimeout(function(){
      touch.classList.remove('_active')
    },5000);
  })

} else { 
  document.body.classList.add('_pc');
 }