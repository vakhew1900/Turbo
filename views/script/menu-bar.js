const menuButton = document.querySelector('.vector-img');
// const mainContent = document.querySelector('.main-content');
console.log(menuButton)

const openCloseMenu = ()=>{
    const menuBar = document.querySelector('.menu-bar')
    
    console.log(getComputedStyle(menuBar).left);
    console.log(getComputedStyle(menuBar).width);
    let width = getComputedStyle(menuBar).width;
    if(getComputedStyle(menuBar).left == '-' + width){
        menuBar.style.left = '0px';
        // mainContent.style.transform = 'translateX('+width+')';   
    }
    else {
        let x = getComputedStyle(menuBar).width
        // console.log(x + 'px')
        menuBar.style.left  =  '-' + x;
        // mainContent.style.transform = 'translateX(0px)';
    }
}

menuButton.onclick = openCloseMenu;