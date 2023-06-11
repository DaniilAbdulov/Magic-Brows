gsap.from('.full-screen__title', {opacity:0, delay:0.5,y:30})
gsap.from('.full-screen__text', {opacity:0, delay:1,y:-30})
gsap.from('.full-screen__link', {opacity:0, delay:1.5,y:60})

var linkNav = document.querySelectorAll('[href^="#portfolio"]'),
    V = 0.4;  // скорость, может иметь дробное значение через точку
for (var i = 0; i < linkNav.length; i++) {
  linkNav[i].addEventListener('click', function(e) {
    e.preventDefault();
    var w = window.pageYOffset,  // прокрутка
        hash = this.href.replace(/[^#]*(.*)/, '$1');  // id элемента, к которому нужно перейти
        t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
        start = null;
        console.log(t)
    requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
    function step(time) {
      if (start === null) start = time;
      var progress = time - start,
          r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
      window.scrollTo(0,r);
      if (r != w + t) {
        requestAnimationFrame(step)
      } else {
        location.hash = hash  // URL с хэшем
      }
    }
  }, false);
}



const dateControl = document.querySelector('input[type="datetime-local"]');
let date = new Date(Date.now());
function normalFormat(value){
  return value < 10 ? '0' + value : value;
}
let month = normalFormat(date.getMonth()+1);
let day = normalFormat(date.getDate());
let hour = normalFormat(date.getHours());
let minute = normalFormat(date.getMinutes());
let now = date.getFullYear() + '-'+ month + '-'+ day + 'T'+ hour + ':'+ minute;
dateControl.value = now;
dateControl.min = now;


