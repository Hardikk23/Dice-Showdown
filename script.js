"use strict";
const score0 = document.getElementById("score-0");
const score1 = document.getElementById("score-1");
const player0 = document.getElementById("player-0");
const player1 = document.getElementById("player-1");
const current0 = document.getElementById("current-0");
const current1 = document.getElementById("current-1");
const dice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");

let num,
  currentScore = 0,
  playerActive = 0,
  score = [0, 0];
function newGame() {
  (currentScore = 0), (playerActive = 0), (score = [0, 0]);
  btnHold.disabled = false;
  btnRoll.disabled = false;
  document.querySelector(".player-0").classList.remove("player-winner");
  document.querySelector(".player-1").classList.remove("player-winner");
  document.querySelector(".player-0").classList.add("player-active");
  document.querySelector(".player-1").classList.remove("player-active");
  score0.textContent = 0;
  score1.textContent = 0;
}
function switchPlayer() {
  if (playerActive === 1) {
    currentScore = 0;
    document.getElementById(`current-${playerActive}`).textContent =
      currentScore;
    document.querySelector(".player-1").classList.remove("player-active");
    document.querySelector(".player-0").classList.add("player-active");
    playerActive = 0;
  } else if (playerActive === 0) {
    currentScore = 0;
    document.getElementById(`current-${playerActive}`).textContent =
      currentScore;
    document.querySelector(".player-0").classList.remove("player-active");
    document.querySelector(".player-1").classList.add("player-active");
    playerActive = 1;
  }
}

function rollDice() {
  num = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice${num}.png`;
  dice.classList.remove("hidden");
  if (num !== 1) {
    currentScore += num;
    document.getElementById(`current-${playerActive}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
}

function hold() {
  if (score[0] > 100) {
    document.querySelector(".player-0").classList.add("player-winner");
    btnHold.disabled = true;
    btnRoll.disabled = true;
    // winningAnimation();
    return;
  } else if (score[1] > 100) {
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 10000);
    document.querySelector(".player-1").classList.add("player-winner");
    btnHold.disabled = true;
    btnRoll.disabled = true;
    // winningAnimation();
    return;
  }
  if (playerActive === 1) {
    score[1] = score[1] + currentScore;
    document.getElementById(`score-1`).textContent = score[1];
    currentScore = 0;
    document.getElementById(`current-${playerActive}`).textContent =
      currentScore;
    document.querySelector(".player-1").classList.remove("player-active");
    document.querySelector(".player-0").classList.add("player-active");
    playerActive = 0;
  } else if (playerActive === 0) {
    score[0] = score[0] + currentScore;
    document.getElementById(`score-0`).textContent = score[0];
    currentScore = 0;
    document.getElementById(`current-${playerActive}`).textContent =
      currentScore;
    document.querySelector(".player-0").classList.remove("player-active");
    document.querySelector(".player-1").classList.add("player-active");
    playerActive = 1;
  }
  if (score[0] > 100) {
    document.querySelector(".player-0").classList.add("player-winner");
    btnHold.disabled = true;
    btnRoll.disabled = true;
    return;
  } else if (score[1] > 100) {
    document.querySelector(".player-1").classList.add("player-winner");
    btnHold.disabled = true;
    btnRoll.disabled = true;
    return;
  }
}

btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", hold);
btnNew.addEventListener("click", newGame);
