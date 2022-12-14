const cards = document.querySelectorAll('.card');

let matchedCards = 0;
let cardOne, cardTwo;
let disableCardSelection = false;

function flipCard(e) {
    
    let clickedCard = e.target;
    if(clickedCard !== cardOne && !disableCardSelection) {
        clickedCard.classList.add('flip');
        if(!cardOne) {
            return cardOne = clickedCard
        }
        cardTwo = clickedCard;
        disableCardSelection = true;
        let cardOneImg = cardOne.querySelector('.back-view img').src,
         cardTwoImg = cardTwo.querySelector('.back-view img').src;

        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) { 
        matchedCards++;
        if(matchedCards == 8) {
            setTimeout(() => {
                return shuffleCards()
            }, 1000);
        }
        cardOne.removeEventListener('click', flipCard)
        cardTwo.removeEventListener('click', flipCard)
        cardOne = cardTwo = ''
        return disableCardSelection = false;
     }
    
    setTimeout(() => {
        cardOne.classList.add('shake')
        cardTwo.classList.add('shake')
    }, 200)

    setTimeout(() => {
        cardOne.classList.remove('shake', 'flip')
        cardTwo.classList.remove('shake', 'flip')
        cardOne = cardTwo = ''
        disableCardSelection = false;
    }, 800)
}

function shuffleCards() {
    matchedCards = 0;
    cardOne = cardTwo = '';
    disableCardSelection = false;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1)
    cards.forEach((card, index) => {
        card.classList.remove('flip');
        let imgTag = card.querySelector('.back-view img');
        imgTag.src = `./images/img-${arr[index]}.png`
        card.addEventListener('click', flipCard);
    })
}

cards.forEach(card => {
    card.addEventListener('click', flipCard);
})

window.onload = shuffleCards()