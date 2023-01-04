const menuButton = document.querySelector('.vector-img');
const pageContent = document.querySelector('.page-content')
// const mainContent = document.querySelector('.main-content');
console.log(menuButton)

const openCloseMenu = ()=>{
    const menuBar = document.querySelector('.menu-bar')
    
    console.log(getComputedStyle(menuBar).left);
    console.log(getComputedStyle(menuBar).width);
    let width = getComputedStyle(menuBar).width;
    if(getComputedStyle(menuBar).left == '-' + width){
        menuBar.style.left = '0px';
        pageContent.classList.add('menu-selected')
        
    }
    else {
        let x = getComputedStyle(menuBar).width
        // console.log(x + 'px')
        menuBar.style.left  =  '-' + x;
        pageContent.classList.remove('menu-selected');
    }
}

menuButton.onclick = openCloseMenu;