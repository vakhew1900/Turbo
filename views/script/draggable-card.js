
const cardContainer = document.querySelector('.card-container');
const cardList = cardContainer.querySelectorAll('.card');


const makeDraggable = (cardList) => {

    for (let card of cardList) {
        card.draggable = true;
        console.log(card)
    }
}


makeDraggable(cardList)
cardContainer.addEventListener('dragstart', (evt) => {
    console.log('yes');
    evt.target.classList.add('selected');
    console.log(evt.target)
})

cardContainer.addEventListener('dragend', (evt) => {
    evt.target.classList.remove('selected');
});

console.log(cardContainer)


cardContainer.addEventListener('dragover', (evt)=> {
    evt.preventDefault();

    const selectedCard = document.querySelector('.selected');

    const currentCard = evt.target;
    console.log(currentCard);

    if(currentCard === selectedCard || selectedCard.classList.contains('card') == false){
        console.log('yes')
        return;
    }
    
    let nextCard = currentCard;

    if (currentCard === selectedCard.nextElementSibling){
        nextCard = currentCard.nextElementSibling;
    }

    cardContainer.insertBefore(selectedCard, nextCard);

}
)