// Select DOM elements and assign variables
var quizQuestions = document.querySelectorAll(".quiz-questions");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var finalScoreEl = document.getElementsByClassName("initals-score")[0];

// Declare variables
var chosenQuestions = "";
var timer;
var timerCount;
var currentQuestion = 0;


console.log(finalScoreEl.textContent);
console.log(document.body.children);
console.log(quizQuestions);

// Quiz questions, options and answers are stored in an array
var questions = [
  {
    qText: "Arrays in Javascript can be used to store ______.",
    choices: [
      "1. numbers",
      "2. booleans",
      "3. strings",
      "4. all of the above"
    ],
    aText: "4. all of the above",
  },

  {
    qText: "The condition in an if/else statement is enclosed within _____.",
    choices: [
      "1. quotes",
      "2. curly brackets",
      "3. parentheses",
      "4. square brackets"
    ],
    aText: "3. parentheses",
  },

  {
    qText: "Commonly used data types DO NOT include?",
    choices: [
      "1. strings",
      "2. alerts",
      "3. booleans",
      "4. numbers"
    ],
    aText: "2. alerts",
  },

  {
    qText: "String values must be enclosed within _____ when being assigned to variables.",
    choices: [
      "1. commas",
      "2. curly brackets",
      "3. quotes",
      "4. parentheses"
    ],
    aText: "3. quotes",
  },

  {
    qText: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log"
    ],
    aText: "4. console.log",
  }

]

// renderQuestion fucntion displays the quiz questions in the DOM element card question-box
function renderQuestion() {
  var questionBox = document.querySelector(".card.question-box");
  questionBox.innerHTML = ('');
  if (currentQuestion === questions.length) {
    displayEndScreen();
    return;

  }
  const question = questions[currentQuestion];
  var questionNode = document.createElement("p");
  questionNode.textContent = question.qText;
  questionBox.appendChild(questionNode);
  for (i = 0; i < question.choices.length; i++) {
    var btn = document.createElement("button")
    btn.innerText = question.choices[i]
    btn.addEventListener("click", checkAnswer);
    questionBox.appendChild(btn);
  }

}
// checkAnswer function ensures answers are correct and incorrect; for incorrect answers, time is deducted 
function checkAnswer(event) {
  console.log(event);
  var userChoice = event.target.innerText;
  const question = questions[currentQuestion];
  var correctChoice = question.aText;
  if (userChoice === correctChoice) {
    console.log("correct");
  } else {
    // deduct time from timer
    timerCount = timerCount - 5
  }
  currentQuestion = currentQuestion + 1
  renderQuestion();
}


// The startQuiz function is called when the start button is clicked
function startQuiz() {
  timerCount = 50;
  timerElement.textContent = timerCount;
  // Prevents start button from being clicked when quiz is in progress
  startButton.disabled = true;
  startTimer()
  renderQuestion()
}


// The setTimer function starts the timer
function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;

    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
    }
  }, 1000);
}

// displayEndScreen function displays the stored intials and score;
// The function also regulates the save initials button and go back button;
function displayEndScreen() {
  clearInterval(timer);
  var input = document.createElement("input");
  var btn = document.createElement("button");
  var btn2 = document.createElement("button");
  btn.addEventListener("click", storeInitials)
  btn2.addEventListener("click", goBack);
  btn.textContent = "Save Initials";
  btn2.textContent = "Go Back";
  input.classList.add("initials");
  var questionBox = document.querySelector(".card.question-box");
  questionBox.appendChild(input);
  questionBox.appendChild(btn);
  questionBox.appendChild(btn2);

  var scores = JSON.parse(localStorage.getItem("scores")) || [];
  var scoresText = "";
  for (let i = 0; i < scores.length; i++) {
    const score = scores[i];
    scoresText += "Highscores: " + "initials " + score.Initials + " and score " + score.score + "; " + "\n";
  }
  finalScoreEl.textContent = scoresText;
  document.querySelector(".timer-text").innerHTML = "Your score is: " + timerCount

  function goBack() {
    window.location.reload();
  }

}

// storeInitials function allows user to enter initials and store initials in local storage
function storeInitials() {
  var Initials = document.querySelector(".initials").value
  console.log(Initials);
  var scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push({ Initials, score: timerCount })
  localStorage.setItem("scores", JSON.stringify(scores))

}

// The start button initiates startQuiz function
startButton.addEventListener("click", startQuiz);




