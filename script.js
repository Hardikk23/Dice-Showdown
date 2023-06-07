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

const audio = document.createElement("audio");
audio.src = "diceSound.mp3";
audio.volume = 0.5;
const audio1 = document.createElement("audio");
audio1.src = "music.mp3";
audio1.volume = 0.5;
const audio2 = document.createElement("audio");
audio2.src = "new.mp3";
audio2.volume = 0.5;
const audio3 = document.createElement("audio");
audio3.src = "hold.wav";
audio3.volume = 0.5;

const container = document.getElementById("fireworks-container");
const fireworks = new Fireworks(container);
function winningAnimation() {
  audio1.play();
  setTimeout(() => {
    audio1.pause();
  }, 10000);
  fireworks.start();
  setTimeout(() => {
    fireworks.stop();
  }, 10000);
}

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
  current0.textContent = 0;
  current1.textContent = 0;
  dice.classList.add("hidden");
  audio1.pause();
  audio1.currentTime = 0;
  audio2.play();
  fireworks.stop();
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
  audio.play();
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
    winningAnimation();
    return;
  } else if (score[1] > 100) {
    document.querySelector(".player-1").classList.add("player-winner");
    btnHold.disabled = true;
    btnRoll.disabled = true;
    winningAnimation();
    return;
  }
  audio3.play();
}

btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", hold);
btnNew.addEventListener("click", newGame);
