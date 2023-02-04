import { projectValidator } from './project_validator.js'

const form = document.querySelector('.enter-form');
const submit = document.querySelector('#button-input')



console.log(form)
console.log(submit)

form.addEventListener('submit', async function (event) {
    
    event.preventDefault();

    const nickname = document.querySelector('#nickname-input').value;
    const password = document.querySelector('#password-input').value;
    const email = document.querySelector('#email-input').value;
    const passwordConfirm = document.querySelector('#password-confirm-input').value;


    if(false){ // проверка почты
        alert('it`s not email');
        return;
    }

    if (password != passwordConfirm){
        alert('password and password confirm are not equal');
        return;
    }



    if (projectValidator.isNickname(nickname) == false
        || projectValidator.isPassword(password) == false) {
        alert('nickname or password is not valid');
        return;
    }

    form.action = `http://localhost:4000/api/users`;
    
    const user = {
        nickname : nickname,
        password : password,
        email : email
    }
    const response = await fetch(form.action,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    }
        );

    const result = await response.json();
    console.log("User Login")
    console.log(result)


    if(response.status == 200){
        localStorage.setItem('token', result)
        window.location.href = "./";
    }
    else {
        localStorage.removeItem('token');
        alert(result);
    }

})
