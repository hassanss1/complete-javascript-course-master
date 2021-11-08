'use strict';

{
  /* <section class="left">
<input type="number" class="guess" />
<button class="btn check">Check!</button>
</section>
<section class="right">
<p class="message">Start guessing...</p>
<p class="label-score">💯 Score: <span class="score">20</span></p>
<p class="label-highscore">
  🥇 Highscore: <span class="highscore">0</span>
</p>
</section> */
}
// Defining secretNumber
let secretNumber = Math.trunc(Math.random() * 20 + 1);
// Defining starting score
let score = 20;
let highscore = 0;
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
const changeBackground = function (color) {
  document.querySelector('body').style.backgroundColor = color;
};
const setHighscore = function (highscore) {
  document.querySelector('.highscore').textContent = highscore;
};

// Listening to buttons beign clicked
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);
  // If the guess is empty and the person just clicked the button?
  if (!guess) {
    displayMessage('No value inserted!');
    // If the guess number is equal to the secretNumber
  } else if (guess > 20 || guess < 1) {
    displayMessage('Duuh it is between 1 and 20!');
  } else if (guess === secretNumber) {
    displayMessage('🎊 You have found the number! 🥳');
    changeBackground('#60b347');
    document.querySelector('.number').style.width = '30rem';
    if (score > highscore) {
      highscore = score;
      setHighscore(highscore);
    }
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('.check').disabled = true;
    // If the guess number is below the secretNumber
  } else if (guess !== secretNumber) {
    displayMessage(guess < secretNumber ? '📉 Too low!' : '📈 Too high!');
    score--;
    document.querySelector('.score').textContent = score;
  } else {
    displayMessage('💥 You lost the game!');
    document.querySelector('.score').textContent = 0;
  }
});
document.querySelector('.again').addEventListener('click', function () {
  changeBackground('#222');
  document.querySelector('.guess').value = '';
  score = 20;
  document.querySelector('.score').textContent = '20';
  displayMessage('Start guessing...');
  document.querySelector('.number').style.width = '15rem';
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  document.querySelector('.number').textContent = '?';
  document.querySelector('.check').disabled = false;
  // Keeping record of previous highscore
  if (!highscore) setHighscore(highscore);
});
