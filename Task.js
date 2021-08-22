"use strict"

var modal = document.getElementById("modal");
var btn = document.getElementsByClassName("btn_modal_window");
var span = document.getElementsByClassName("close_modal_window")[0];

for (let i=0;i<btn.length;i++){
    btn[i].addEventListener("click", function(){
        modal.style.display = "block";
    });
};


span.onclick = function () {
   modal.style.display = "none";
}

window.onclick = function (event) {
   if (event.target == modal) {
       modal.style.display = "none";
   }
}

document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('contact');
    form.addEventListener('submit', formSend);

    async function formSend(e){
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if (error===0){
            form.classList.add('_sending');
            let response = await fetch('Task.php',{
                method: 'POST',
                body:formData
            });
            if (response.ok){
                let result = await response.json();
                alert(result.message);
                form.reset();
                form.classList.remove('_sending');
            }else{
                alert('Ошибка!');
                form.classList.remove('_sending');
            }
        }else{
            alert('Заполните обязательные поля!');
        }
    }


    function formValidate(form){
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++){
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')){
                if (emailTest(input)){
                    formAddError(input);
                    error++;
                }
            }else if(input.classList.contains('_phone')){
                if (phoneTest(input)){
                    formAddError(input);
                    error++;
                }
            }else{
                if (input.value === ''){
                    formAddError(input);
                    error++;
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


    function emailTest(input){
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }


    function phoneTest(input){
        return /^\d{10}$/.test(input.value);
    }
});


 