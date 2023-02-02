import { projectValidator } from './project_validator.js'

const form = document.querySelector('.login-form');
const submit = document.querySelector('#button-input')



console.log(form)
console.log(submit)

form.addEventListener('submit', async function (event) {
    
    event.preventDefault();

    const nickname = document.querySelector('#nickname-input').value;
    const password = document.querySelector('#password-input').value;
    console.log(nickname);
    console.log(password);


    if (projectValidator.isNickname(nickname) == false
        || projectValidator.isPassword(password) == false) {
        alert('nickname or password is not valid');
        return;
    }

    form.action = `http://localhost:4000/api/users?nickname=${nickname}&password=${password}`;
    
    const response = await fetch(form.action);

    const result = await response.json();
    console.log("User Login")
    console.log(result)

})
