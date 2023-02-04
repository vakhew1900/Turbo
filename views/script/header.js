const createButton = document.querySelector('.create-article-button');
const avatar = document.querySelector('.avatar-icon');
const enterButton = document.querySelector('.entry-button')


if(localStorage.getItem('token')!= null){
    createButton.style.display = '';
    avatar.style.display = '';
    enterButton.style.display = 'none';
}
else {

    createButton.style.display = 'none';
    avatar.style.display = 'none';
    enterButton.style.display = '';
}