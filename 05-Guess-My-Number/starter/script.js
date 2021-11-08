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
const secretNumber = Math.trunc(Math.random() * 20 + 1);
document.querySelector('.number').textContent = secretNumber;
// Defining starting score
let score = 20;
let highscore = 0;

// Listening to buttons beign clicked
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);
  // If the guess is empty and the person just clicked the button?
  if (!guess) {
    document.querySelector('.message').textContent = 'No value inserted! ';
    // If the guess number is equal to the secretNumber
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent =
      '🎊 You have found the number! 🥳';
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    highscore = score;
    document.querySelector('.highscore').textContent = score;
    document.querySelector('.check').disabled = true;
    // If the guess number is below the secretNumber
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📉 Too low!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 You lost the game!';
      document.querySelector('.score').textContent = 0;
    }
    // If the guess number is above the secretNumber
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📈 Too high!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 You lost the game!';
      document.querySelector('.score').textContent = 0;
    }
  }
});
document.querySelector('.again').addEventListener('click', function () {
  document.querySelector('body').style.backgroundColor = 'black';
  document.querySelector('.guess').value = '';
  document.querySelector('.score').textContent = '20';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.number').style.width = '15rem';
  // Keeping record of previous highscore
  if (!highscore) document.querySelector('.highscore').textContent = highscore;
});
