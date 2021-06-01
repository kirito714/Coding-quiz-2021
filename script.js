const startBtn = document.querySelector("#startBtn");
const home = document.querySelector("#home");
const quiz = document.querySelector("#quiz");
const startquizbtn = document.querySelector("#startquizbtn");
const questions = document.querySelector("#questions");
const qtime = document.querySelector("#qtime");
const time = document.querySelector(".time");

startBtn.addEventListener("click", function (e) {
  home.classList.add("hidden");
  quiz.classList.remove("hidden");
});

startquizbtn.addEventListener("click", function (e) {
  quiz.classList.add("hidden");
  qtime.classList.remove("hidden");
  setTime();
});

var secondsLeft = 80;
function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    time.textContent = secondsLeft + " Time Left!";

    if (secondsLeft === 0) {
      clearInterval(timerInterval);

    
    }
  }, 1000);
}
