'use strict'
gsap.from('.full-screen__title', {opacity:0, delay:0.5,y:30})
gsap.from('.full-screen__text', {opacity:0, delay:1,y:-30})
gsap.from('.full-screen__link', {opacity:0, delay:1.5,y:60})




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



document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  const load = document.getElementById('load');
  form.addEventListener('submit', formSend);

  function formSend(e) {
    e.preventDefault();

    const error = formValidate(form);

    if (error === 0) {
      load.classList.add('_sending');
      console.log('1');

      fetch('server-file.php', {
        method: 'POST',
        body: new FormData(form)
      })
        .then(response => {
          if (response.ok) {
            console.log('2');
            return response.json();
          } else {
            throw new Error('Network response was not ok.');
          }
        })
        .then(result => {
          console.log('3');
          alert(result.message);
          form.reset();
          load.classList.remove('_sending');
        })
        .catch(error => {
          console.error('4', error);
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