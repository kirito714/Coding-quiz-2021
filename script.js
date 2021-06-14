const startBtn = document.querySelector("#startBtn");
const home = document.querySelector("#home");
const quiz = document.querySelector("#quiz");
const startquizbtn = document.querySelector("#startquizbtn");
const question = document.querySelector("#question");
const qtime = document.querySelector("#qtime");
const time = document.querySelector(".time");
const scoreText = document.querySelector("#progressBarFull");
const progressText = document.querySelector("#progressText");
const answerText = Array.from(document.querySelectorAll(".answer-text"));
const highScoreScreen = document.querySelector("#highScoreScreen");
const highScoreBtn = document.querySelector("#HighScores-btn");
const leaderData = JSON.parse(localStorage.getItem("userInfo")) || [];

const subBtn = document.querySelector("#submitBtn");
const UserForm = document.querySelector("#initform");
const homeScrn = document.querySelector("#homeScreen");

// CAPs note in JS shows that its going to be fixed.
const SCORE_POINTS = 100;
const MAX_QUEStIONS = 4;
const initials = document.querySelector("#initialsInput");

// let highScore = document.querySelector("#score");
let secondsLeft = 80; //not sure why that was a const but i fixed it. was working before sry.
let score = 0;
let acceptingAnswers = true;
let availableQuestions = [];
let currentQuestion = {};
let questionCounter = 0;

const questions = [
  {
    question: "Thor uses what weapon?",
    choices: ["Sword", "Hammer", "Sniper Rifle", "Warship"],
    answer: 1, // index of correct answer
  },
  {
    question: "Iron Mans name is?",
    choices: ["John Stark", "Tony Slark", "Morgan Freeman", "Tony Stark"],
    answer: 3, // index of correct answer
  },
  {
    question: "DeadPool's favorite food is ?",
    choices: ["Pizza", "chimmy (Burrito)", "Burgers", "Salad"],
    answer: 1, // index of correct answer
  },
  {
    question: " Whats BatMans name?",
    choices: ["John Wayne", "Bruce Banner", "Jim Carry", "Bruce Wayne"],
    answer: 3, // index of correct answer
  },
];

startGame = () => {
  questionCounter = 0;
  score = 0;
  // using a spread operator to include all available questions.
  availableQuestions = [...questions];
  getNewQuestion();
  setTime();
};
// get new question function
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUEStIONS) {
    //saves recent score to local storage
    localStorage.setItem("mostRecentScore", score);
    for (let i = leaderData.length - 3; i < leaderData.length; i++) {
      if (i < 0) {
        i = 0;
      }
      var li = document.createElement("li");

      let currentInitials = leaderData[i].inits;
      let currentScore = leaderData[i].score;
      let text = `${currentInitials} : ${currentScore}`;
      li.innerText = text;
      document.getElementById("top3").appendChild(li);
    }

    return endDisplayHighScoreScreen();
  }
  // makes question counter go up by 1
  questionCounter++;
  // makes the counter go up plus one 2 of 4, 3 of 4 ect.
  progressText.innerText = `question ${questionCounter} of ${MAX_QUEStIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUEStIONS) * 100}%`;
  //  calculate the value of the question index
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  // keep track of the question user is on.
  currentQuestion = availableQuestions[questionIndex];
  // shows the question to display.
  question.innerText = currentQuestion.question;

  answerText.forEach((choice, i) => {
    choice.innerText = currentQuestion.choices[i];
  });
  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

answerText.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;

    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    } else {
      secondsLeft -= 20;
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);

      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
startBtn.addEventListener("click", function (e) {
  home.classList.add("hidden");
  quiz.classList.remove("hidden");
});

startquizbtn.addEventListener("click", function (e) {
  quiz.classList.add("hidden");
  qtime.classList.remove("hidden");

  startGame();
});
homeScrn.addEventListener("click", function (e) {
  home.classList.add("hidden");
  quiz.classList.remove("hidden");
  highScoreScreen.classList.add("hidden");
});

highScoreBtn.addEventListener("click", function (e) {
  displayHighScoreScreen();

  for (let i = leaderData.length - 3; i < leaderData.length; i++) {
    if (i < 0) {
      i = 0;
    }
    var li = document.createElement("li");

    let currentInitials = leaderData[i].inits;
    let currentScore = leaderData[i].score;
    let text = `${currentInitials} : ${currentScore}`;
    li.innerText = text;
    document.getElementById("top3").appendChild(li);
    UserForm.classList.add("hidden");
  }
});
subBtn.addEventListener("click", function (e) {
 displayHighScoreScreen();

  const userInits = initials.value;
  const lastUser = {
    inits: userInits,
    score: score,
  };

  leaderData.push(lastUser);

  localStorage.setItem("userInfo", JSON.stringify(leaderData));
});

// make function for rendering leaderboard in HTML

function displayHighScoreScreen() {
  quiz.classList.add("hidden");
  home.classList.add("hidden");
  qtime.classList.add("hidden");
  highScoreScreen.classList.remove("hidden");
}
function endDisplayHighScoreScreen() {
  quiz.classList.add("hidden");
  home.classList.add("hidden");
  homeScrn.classList.add("hidden");
  qtime.classList.add("hidden");
  UserForm.classList.remove("hidden");
  highScoreScreen.classList.remove("hidden");
}

function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    time.textContent = secondsLeft + " Time Left!";

    if (secondsLeft <= 0) {
      secondsLeft = 0;
      clearInterval(timerInterval);
      endDisplayHighScoreScreen();
    }
  }, 1000);
}
