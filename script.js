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
answerContainer.addEventListener("click", function(event){
  var element = event.target;
  if(element.type == 'submit'){
    var msg = '';
    if(element.textContent == questionsArray[questionIndex].answer){
      msg = "CORRECT";
    }else {
      msg = "INCORRECT";
      //Penalty reduce timer value by 5
      timeLeft = timeLeft - 5;
    }

    //Show correct/incorrect at the bottom
    var msgDiv = document.getElementById('ansMessage');
    msgDiv.textContent = msg;
    setTimeout(()=>{
      msgDiv.textContent = "";
    }, 1000)

    //Go to the next question
    questionIndex++;
    loadQuestion();
  }
});


function startQuiz() {
  quizTimeCounter();
  document.getElementById('homeSection').style.setProperty('display','none');
  document.getElementById('questionContainer').style.setProperty('display','block');
  loadQuestion();
}

function loadQuestion(){
  if( questionIndex < questionsArray.length){
    var questionObject = questionsArray[questionIndex];
    document.getElementById('questionTitle').textContent = questionObject.title;
    document.getElementById('ch1').textContent = questionObject.choices[0];
    document.getElementById('ch2').textContent = questionObject.choices[1];
    document.getElementById('ch3').textContent = questionObject.choices[2];
    document.getElementById('ch4').textContent = questionObject.choices[3];
  }else {
    //No more questions to load
    document.getElementById('questionContainer').style.setProperty('display','none');
    document.getElementById('alldonePage').style.setProperty('display','block');

    //Stop timer
    document.getElementById('finalScore').textContent +=  timeLeft;
    clearInterval(timeInterval);
  }

}

var timeEl = document.querySelector("#timer");

var timeLeft = 50;
var timeInterval;

function quizTimeCounter() {
  timeInterval = setInterval(function () {
    timeLeft--;
    timeEl.textContent = "Time: " + timeLeft;
    if (timeLeft == 0) {
      alert("Time out!!")
      clearInterval(timeInterval);
    }
  }, 1000);
}











