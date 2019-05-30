/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName('card');
let cards = [...card];

let star = document.getElementsByClassName('stars');
let stars = [...star[0].children];

var second = 0, minute = 0, hour = 0;
var interval;
let moves = 0;

var openCards = [];
let matchCards = 0;
const maxMatchs = 8;
let firstMove = true;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//add opened cards 
function move(card) {
    //start timer after the first opened card
    if (firstMove) {
        Timer();
        firstMove = false;
    }
    openCards.push(card);
    if (openCards.length === 2) {
        increaseCounter();
        if (openCards[0].children[0].className === openCards[1].children[0].className) {           
            match();
        } else {
            unmatch();           
        }
    }
}

//Display time
function setTime() {
    document.querySelector('.timer').innerHTML = minute + ' : ' + second;
}
//Initialize timer
function resetTimer() {
    if (interval !== null) {
        clearInterval(interval);
    }
    //Clean actuel counters
    second = 0; minute = 0; heure = 0;
    setTime();
}

function congrats() {
    let time = document.querySelector('.timer').innerHTML;
    resetTimer();
    $('#final-time').html(time);
    $('#final-moves').html(moves);
    $('#rating').html(document.querySelector(".stars").innerHTML);
    $('#congrats').modal('show');

}

//Action for a match
function match() {
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');
    openCards[0].classList.remove('show', 'open');
    openCards[1].classList.remove('show', 'open');
    openCards = [];
    matchCards++;
    console.log(matchCards);
    if (matchCards === maxMatchs) {
        congrats();
    }
}

//Actions for when cards don't match
function unmatch() {
    setTimeout(function () {
        openCards[0].classList.remove('show', 'open', 'unmatch');
        openCards[1].classList.remove('show', 'open', 'unmatch');
        openCards = [];
    }, 1000);
}

//disable cards temporarily
function disable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('disabled');
    });
}

//enable cards and disable match cards
function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matchCard.length; i++) {
            matchCard[i].classList.add('disabled');
        }
    });
}

function increaseCounter() {
    //increment and display moves
    moves++;
    document.querySelector('.moves').innerHTML = moves;    

    // set rates - stars
    if (moves > 8 && moves < 12) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = 'collapse';
            }
        }
    }
    else if (moves > 13) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = 'collapse';
            }
        }
    }
}

function setMoves() {
    //display moves
    document.querySelector('.moves').innerHTML = moves;
}

function Timer() {
    interval = setInterval(function () {
        second++;
        if (second === 60) {
            minute++;
            second = 0;
        }
        if (minute === 60) {
            hour++;
            minute = 0;
        }
        setTime();
    }, 1000);   
}

function newGame() {
    const deck = document.querySelector('.deck');
    // shuffle deck
    cards = shuffle(cards);
    // remove all existing classes from each card
    for (let i = 0; i < cards.length; i++) {
        deck.innerHTML = '';
        [].forEach.call(cards, function (item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove('show', 'open', 'match', 'disabled');
    }
    // reset moves
    moves = 0;
    setMoves();
    openCards = [];
    firstMove = true;
    // reset star rating
    for (let i = 0; i < stars.length; i++) {
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    };
}

function initializeGame() {
    //set action for clicked cards
    //change status and trigger move
    let status = function () {
        this.classList.toggle('open');
        this.classList.toggle('show');
        this.classList.toggle('disabled');
        move(this);
    };

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', status);
    }
    newGame();
}

//Steps to clean information for the previous game
function resetGame() {    
    newGame();
    resetTimer();
}
/*
 * set up the event listener for a card. If a card is clicked:

  *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of 'open' cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have match, display a message with the final score (put this functionality in another function that you call from this one)
 */

window.onload = initializeGame();
