'use strict';

// Selecting elements
// Players
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// Players's scores
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
// Player's current scores
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
// Dice image
const diceImage = document.querySelector('.dice');
// Buttons
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceImage.classList.add('hidden');
let activePlayer = 0;
let currentScore = 0;
const score = [0, 0];
let playing = true;

// Declaring Switch user
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// User rolls dice
rollBtn.addEventListener('click', function () {
  if (playing) {
    // Generate random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    // Display dice roll
    diceImage.src = `dice-${dice}.png`;
    diceImage.classList.remove('hidden');
    // If it is not 1, add dice roll to current score and display it
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // If it is 1, switch player
    } else {
      switchPlayer();
    }
  }
});

// User holds score
holdBtn.addEventListener('click', function () {
  if (playing) {
    // Bring the current score to the actual score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // If score >= 20 win
    if (score[activePlayer] >= 20) {
      // Turn player--active off, add player--winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      // Deactivate buttons or turn playing off
    }
    // Switch player
    switchPlayer();
  }
});
