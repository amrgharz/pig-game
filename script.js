'use strict';
// Declaring variabls
let playerOneSec = document.querySelector('.player--0');
let playerTwoSec = document.querySelector('.player--1');
let playerOneScore = document.querySelector('#score--0');
let playerTwoScore = document.querySelector('#score--1');
let dice = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let playerOneCurrent = document.getElementById('current--0');
let playerTwoCurrent = document.getElementById('current--1');
let currentScore;
let activePlayer;
let scores;
let playing;
//Set Game initial values

const init = function () {
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.dice').classList.add('hidden');
  if (playerOneSec.classList.contains('player--winner')) {
    playerOneSec.classList.remove('player--winner');
  } else {
    playerTwoSec.classList.remove('player--winner');
  }
  playerOneScore.textContent = '0';
  playerTwoScore.textContent = '0';
  playerOneCurrent.textContent = '0';
  playerTwoCurrent.textContent = '0';
  dice.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
};
init();

//Sitch Player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = '0';
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerOneSec.classList.toggle('player--active');
  playerTwoSec.classList.toggle('player--active');
};

// Rolling the dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generating a randome number
    const diceRolled = Math.trunc(Math.random() * 6 + 1);
    console.log(diceRolled);

    //Display the hidden dice
    dice.classList.remove('hidden');

    //Assigning the randome number to the dice and display it
    dice.src = `dice-${diceRolled}.png`;

    //Add the rolled dice to the current score
    if (diceRolled !== 1) {
      currentScore += diceRolled;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Holding the score functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    //Add the current score to the total when holding
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //Finish the game when 100 hit
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector('.dice').classList.add('hidden');
    }

    //switch the player when hold pressed
    switchPlayer();
  }
});

//Reseting the game to its initial values
btnNew.addEventListener('click', init);
