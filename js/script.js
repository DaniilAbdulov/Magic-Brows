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





document.addEventListener('DOMContentLoaded', function (){
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);


  async function formSend(e){
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);


    if(error === 0){
    const load = document.getElementById('load');
    load.classList.add('_sending');
    let response = await fetch('sendmail.php',{
      method:'POST',
      body:formData
    });
    if(response.ok){
      let result = await response.json();
      alert(result.message);
      formPreview.innerHTML = '';
      form.reset();
      load.classList.remove('_sending');
    }else{
      alert('Ошибка');
      load.classList.add('_sending');
    }


    }else{
      alert('В подсвеченном поле некоректные данные')
    }

  }
  function formValidate(form){
      let error = 0;
      let formReq = document.querySelectorAll('._req');

      for(let i = 0; i < formReq.length; i++){
        const input = formReq[i];
        formRemoveError(input);

        if(input.classList.contains('_name')){
          if (nameTest(input)){
            formAddError(input);
            error++
          }
        }else if (input.classList.contains('_telephone')){
          if (telephoneTest(input)){
            formAddError(input);
            error++
           }
        }else {
          if(input.value === ''){
            formAddError(input);
            error++
          }
        }
      }
      return error;
  }



    function formAddError(input){
      input.parentElement.classList.add('_error');
      input.classList.add('_error');
    }
    function formRemoveError(input){
      input.parentElement.classList.remove('_error');
      input.classList.remove('_error');
    }
    function nameTest(input) {
      return !(/^[\.\,\-\_\'\"\@\?\!\:\$ А-Яа-я()]/.test(input.value));  // IE > 9
    }
    function telephoneTest(input){
      return !(/^([^\d]*?\d){10,11}$/.test(input.value)); 
    }


  


})

