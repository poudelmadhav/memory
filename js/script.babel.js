'use strict';

// Card data
var cardsArray = [{
  'name': 'shell',
  'img': 'img/blueshell.png'
}, {
  'name': 'star',
  'img': 'img/star.png'
}, {
  'name': 'bobomb',
  'img': 'img/bobomb.png'
}, {
  'name': 'mario',
  'img': 'img/mario.png'
}, {
  'name': 'luigi',
  'img': 'img/luigi.png'
}, {
  'name': 'peach',
  'img': 'img/peach.png'
}, {
  'name': '1up',
  'img': 'img/1up.png'
}, {
  'name': 'mushroom',
  'img': 'img/mushroom.png'
}, {
  'name': 'thwomp',
  'img': 'img/thwomp.png'
}, {
  'name': 'bulletbill',
  'img': 'img/bulletbill.png'
}, {
  'name': 'coin',
  'img': 'img/coin.png'
}, {
  'name': 'goomba',
  'img': 'img/goomba.png'
}];

// Duplicate array to create a match for each card
var gameGrid = cardsArray.concat(cardsArray);

// Randomize game grid on each load
gameGrid.sort(function () {
  return 0.5 - Math.random();
});

// Define app root and outer grid
var game = document.getElementById('game');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

// Set each card item to a div element and append to the DOM
gameGrid.forEach(function (item) {
  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = item.name;

  var front = document.createElement('div');
  front.classList.add('front');

  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = 'url(' + item.img + ')';

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var clickDisabled = false;
var delay = 1200;

// Reset on success and fail
var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
};

// Remove selected CSS
var deselect = function deselect() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });
};

// Add match CSS
var match = function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
  });
};

// Click event 
grid.addEventListener('click', function (event) {
  var clicked = event.target;
  // Disallow clicking of already matched elements, parent element, and third click
  if (clicked.parentNode.classList.contains('match') || clicked.nodeName === 'SECTION' || clickDisabled) {
    return;
  }
  // Only count first two clicks
  if (count < 2) {
    count++;
    // Select the first two guesses
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else if (count === 2) {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }
    // If first and second guesses have been made
    if (firstGuess !== '' && secondGuess !== '') {
      // If the guesses aren't the same element but have the same name
      if (firstGuess === secondGuess && event.target !== previousTarget) {
        setTimeout(match, delay);
        setTimeout(deselect, delay);
        setTimeout(resetGuesses, delay);
      } else {
        setTimeout(deselect, delay);
        setTimeout(resetGuesses, delay);
      }
    }
    // Make sure both targets aren't the same element
    previousTarget = event.target;
  } else {
    // Disable third click until timeouts complete
    clickDisabled = true;
    setTimeout(function () {
      clickDisabled = false;
    }, delay);
  }
});