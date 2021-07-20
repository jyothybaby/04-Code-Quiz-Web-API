var questionsArray = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts"
  },
  {
    title: "The condition in an if/else statement is enclosed with in ____.",
    choices: ["1. quotes", "2. Curley brackets", "3. Parenthesis", "4. Square brackets"],
    answer: "3. Parenthesis"
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: ["1. Numbers and Strings", "2. Other Arrays", "3. Booleans", "4. All of the above"],
    answer: "4. All of the above"
  },
  {
    title: "String values must be enclosed wthin _____ when being assigned to variables.",
    choices: ["1. Commas", "2. Curley brackets", "3. Quotes", "4. Parenthesis"],
    answer: "3. Quotes"
  },
  {
    title: "A very useful tool used during development and debugger for printing content to the debugger is:",
    choices: ["1. JavaScript", "2. Terminal / bash", "3. For loops", "4. console.log"],
    answer: "4. console.log"
  }];

var butnStartQuiz = document.querySelector("#startQuiz");
butnStartQuiz.addEventListener("click", startQuiz);
var questionIndex = 0;

var answerContainer = document.getElementById('answerchoices');
answerContainer.addEventListener("click", function (event) {
  var element = event.target;
  if (element.type == 'submit') {
    var msg = '';
    if (element.textContent == questionsArray[questionIndex].answer) {
      msg = "CORRECT";
    } else {
      msg = "INCORRECT";
      //Penalty reduce timer value by 5
      if ((timeLeft - 5) < 0){
        timeLeft = 0;
        timeEl.textContent = "Time: " + timeLeft;
        ShowAllDone();
      } else {
        timeLeft = timeLeft - 5;
        timeEl.textContent = "Time: " + timeLeft;
      }
    }

    //Show correct/incorrect at the bottom
    var msgDiv = document.getElementById('ansMessage');
    msgDiv.textContent = msg;
    setTimeout(() => {
      msgDiv.textContent = "";
    }, 1000)

    //Go to the next question
    questionIndex++;
    loadQuestion();
  }
});


function startQuiz() {
  quizTimeCounter();
  document.getElementById('homeSection').style.setProperty('display', 'none');
  document.getElementById('questionContainer').style.setProperty('display', 'block');
  loadQuestion();
}

function loadQuestion() {
  if (questionIndex < questionsArray.length) {
    var questionObject = questionsArray[questionIndex];
    document.getElementById('questionTitle').textContent = questionObject.title;
    document.getElementById('ch1').textContent = questionObject.choices[0];
    document.getElementById('ch2').textContent = questionObject.choices[1];
    document.getElementById('ch3').textContent = questionObject.choices[2];
    document.getElementById('ch4').textContent = questionObject.choices[3];
  } else {
    ShowAllDone();
  }
}

function ShowAllDone(){
  //No more questions to load
  document.getElementById('questionContainer').style.setProperty('display', 'none');
  document.getElementById('alldonePage').style.setProperty('display', 'block');

  //Stop timer
  document.getElementById('finalScore').textContent += timeLeft;
  clearInterval(timeInterval);
}


var allHighScore = document.querySelector("#allHighScore");

function initializeScores() {
  var scoreSheet = JSON.parse(localStorage.getItem("scoreSheet"));
  if (scoreSheet !== null) {
    scores = scoreSheet;
  }
}

function clearHighScores() {
  localStorage.removeItem("scoreSheet");
  scores = [];
  viewScores();
}

function viewScores() {
  var scoreSheet = JSON.parse(localStorage.getItem("scoreSheet"));
  if (scoreSheet !== null) {
    scores = scoreSheet;
  }
  renderScores();
  document.getElementById('homeSection').style.setProperty('display', 'none');
  document.getElementById('alldonePage').style.setProperty('display', 'none');
  document.getElementById('score').style.setProperty('display', 'block');
}

var allHighScoreList = document.querySelector("#allHighScoreList");

function renderScores() {
  allHighScoreList.innerHTML = "";
  for (var i = 0; i < scores.length; i++) {
    var score = scores[i];

    var li = document.createElement("li");
    li.textContent = score;
    //li.setAttribute("data-index", i);

    allHighScoreList.appendChild(li);
  }
}

var formMsg = document.querySelector("#formMsg");

function displayMessage(type, message) {
  formMsg.textContent = message;
  formMsg.setAttribute("class", type);
}

var scores = [];

var allDneBtn = document.querySelector("#allDneBtn");

allDneBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var txtInitials = document.getElementById("txtInitials").value;
  if (txtInitials === "") {
    displayMessage("error", "Please enter your initials!!");
    return;
  } else {
    displayMessage("success", "Well done!!");
    scores.push(txtInitials + ' - ' + timeLeft)
    localStorage.setItem("scoreSheet", JSON.stringify(scores));
    
    viewScores();
  }
});


var timeEl = document.querySelector("#timer");

var timeLeft = 15;
var timeInterval;

function quizTimeCounter() {
  timeInterval = setInterval(function () {
    timeLeft--;
    timeEl.textContent = "Time: " + timeLeft;
    if (timeLeft < 1) {
      ShowAllDone();
    }
  }, 1000);
}


initializeScores();








