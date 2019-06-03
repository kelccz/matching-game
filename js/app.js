// Create a list that holds all of your cards
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


// Disable cards
function disable() {    
    cards.forEach(function(element) {
        element.classList.add('disabled');
    });  
}

// Enable cards except the matchs
function enable() {
    cards.forEach(function (element) {
        if (!element.classList.contains("match")) {
            element.classList.remove('disabled');
        }
    });
}

// Add opened cards 
function move(card) {
    // Disable current opened card
    card.classList.add('disabled');
    // Start timer after the first opened card
    if (firstMove) {
        timer();
        firstMove = false;
    }
    openCards.push(card);
    if (openCards.length === 2) {
        // Disable all the cards        
        increaseCounter();
        if (openCards[0].children[0].className === openCards[1].children[0].className) {           
            match();
           
        } else {
            unmatch();           
        }        
    }
}

// Display time
function setTime() {
    document.querySelector('.timer').innerHTML = minute + ' : ' + second;
}

// Initialize timer
function resetTimer() {
    if (interval !== null) {
        clearInterval(interval);
    }
    // Clean actuel counters
    second = 0; minute = 0; heure = 0;
    setTime();
}

// Show modal after sucess
function congrats() {
    let time = document.querySelector('.timer').innerHTML;
    resetTimer();
    $('#final-time').html(time);
    $('#final-moves').html(moves);
    $('#rating').html(document.querySelector(".stars").innerHTML);
    $('#congrats').modal('show');

}

// Action for a match
function match() {
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');
    openCards[0].classList.remove('show', 'open');
    openCards[1].classList.remove('show', 'open');
    openCards = [];
    matchCards++;
    if (matchCards === maxMatchs) {
        congrats();
    }
}

// Actions for when cards don't match
function unmatch() {
    disable();
    setTimeout(function () {
        openCards[0].classList.remove('show', 'open', 'unmatch');
        openCards[1].classList.remove('show', 'open', 'unmatch');
        openCards = [];
        enable();
    }, 1200);
}

function increaseCounter() {
    // Increment and display moves
    moves++;
    document.querySelector('.moves').innerHTML = moves;    

    // Set rates - stars
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
    // Display moves
    document.querySelector('.moves').innerHTML = moves;
}

function timer() {
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
    // Shuffle deck
    cards = shuffle(cards);
    // remove all existing classes from each card
    for (let i = 0; i < cards.length; i++) {
        deck.innerHTML = '';
        [].forEach.call(cards, function (item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove('show', 'open', 'match', 'disabled');
    }
    // Reset moves
    moves = 0;
    setMoves();
    openCards = [];
    firstMove = true;
    // reset star rating
    for (let i = 0; i < stars.length; i++) {
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
}

function initializeGame() {
    // Set action for clicked cards
    // Change status and trigger move
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

// Steps to clean information for the previous game
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
