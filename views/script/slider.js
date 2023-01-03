const sliderList = document.querySelectorAll('.slider');
const wrapper = document.querySelector( ".slider-wrapper" );
const slideSwitchers = document.querySelectorAll('.slider-switcher');

let currentIndex = 0;
const sliderLength = sliderList.length;



const slide = (index)=>{
    console.log()
    let slider = sliderList[index];
    const selectedSwitcher= document.querySelector('.selected-switcher');
    
    if(selectedSwitcher)
        selectedSwitcher.classList.remove('selected-switcher');

    slideSwitchers[index].classList.add('selected-switcher');

    wrapper.style.left = '-' + slider.offsetLeft + "px";
}

const func = (element) => {
    
    let index =  parseInt( element.getAttribute( "data-number" ), 10 ) - 1;
    console.log(index);
    element.addEventListener( "click",  () => slide(index));
}

for(let slideSwitcher of slideSwitchers){
    func(slideSwitcher);
}

