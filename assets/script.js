// DOM elements
var startEl = document.querySelector('#startButton');
var timeEl = document.querySelector('.time');
var questionEl = document.querySelector('#question');
var questionArea = document.querySelector('#questionarea');
var questionView = document.querySelector('#questionview');
var homeScreenSection = document.querySelector('#homescreen');
var highScoreSection = document.querySelector('#highscoreinput');
var highscores = document.querySelector('#highscores');
var highscore = document.querySelector('#highscore');
var secondsLeft = 20;
var currentQuestion;
var index = 1;
var score = 0;
var rightOrWrong = '';
var userScores = [];

// create buttons
var submitBtnEl = document.createElement('button');
var goBackButton = document.createElement('button');
var clearHighScores = document.createElement('button');


// question content
var question1 = {
  question: 'Which of these actions can be done with array methods?',
  answerChoices: ['Remove an item from an array.', 'Join two arrays.', 'Capitalize letters of a string.', 'All of the above.'],
  isCorrect: 'choiceD',
}

var question2 = {
  question: 'What is the \'.log\' in console.log?',
  answerChoices: ['A function.', 'A variable.', 'An object.', 'A link.'],
  isCorrect: 'choiceA',
}
// array of questions
var questions = [question1, question2];


// ----------------------event listeners-------------------------------------
startEl.addEventListener('click', function() {
  setTime();

  questionEl.textContent = question1.question;
  choiceA.textContent = question1.answerChoices[0];
  choiceB.textContent = question1.answerChoices[1];
  choiceC.textContent = question1.answerChoices[2];
  choiceD.textContent = question1.answerChoices[3];

  choiceA.removeAttribute('class', 'hide');
  choiceB.removeAttribute('class', 'hide');
  choiceC.removeAttribute('class', 'hide');
  choiceD.removeAttribute('class', 'hide');
  homeScreenSection.remove();
});

questionArea.addEventListener('click', function(event) {
  navigateQuestions(event.target.id);
  isItCorrect(event.target.id);
});

highscore.addEventListener('click', function() {
  displayHighScores();
});

submitBtnEl.addEventListener('click', function() {
  var initials = document.getElementById('initials').value;

  var userScore = {
    name: initials.trim(),
    score: score,
    time: secondsLeft,
  };

  var storedScores = JSON.parse(localStorage.getItem("userScores"));

  if (storedScores !== null) {
    userScores = storedScores;
  }

  userScores.push(userScore);
  localStorage.setItem("userScores", JSON.stringify(userScores));

  highScoreSection.remove();
  displayHighScores();
});

goBackButton.addEventListener('click', function() {
  window.location.reload();
});

clearHighScores.addEventListener('click', function() {
  // clear local storage
  localStorage.removeItem('userScores');
  displayHighScores();
});

// ---------------------------------------------------------------------------


timeEl.textContent = 'Time: ' + secondsLeft ;

function setTime() {

  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = 'Time: ' + secondsLeft ;
    console.log('index', index);

    if(secondsLeft <= 0 || index === -1) {
      // Stops execution of action at set interval
      questionView.remove();
      clearInterval(timerInterval);
      displayHighScoreInput();
    }

  }, 1000);
}

function isItCorrect(id) {
  if (id === currentRightAnswer) {
    rightOrWrong = 'right';
    score++;
  } else {
    secondsLeft = secondsLeft - 5;
    rightOrWrong = 'wrong';
  }
  console.log(rightOrWrong);
}

function navigateQuestions() {

  currentRightAnswer = questions[index - 1].isCorrect;

  if (!questions[index]) {
    index = -1;
    return;
  }
  currentQuestion = questions[index].question;
  currentAnswers = questions[index].answerChoices;

  // add textcontent
  questionEl.textContent = currentQuestion;
  choiceA.textContent = currentAnswers[0];
  choiceB.textContent = currentAnswers[1];
  choiceC.textContent = currentAnswers[2];
  choiceD.textContent = currentAnswers[3];

  index++;
}

function displayHighScoreInput() {
  highScoreSection.textContent = 'Your High Score: ' + secondsLeft;
  var pEl = document.createElement('p');
  var inputEl = document.createElement('input');

  pEl.textContent = 'Please enter your initials:';
  pEl.setAttribute('class', 'text-success');
  inputEl.setAttribute('id', 'initials');
  submitBtnEl.textContent = 'Submit';

  highScoreSection.appendChild(pEl);
  highScoreSection.appendChild(inputEl);
  highScoreSection.appendChild(submitBtnEl);
} 


function displayHighScores() {
  homeScreenSection.remove();

  var highscoreHeader = document.createElement('h2');
  var scoreListEl = document.createElement('ol');

  highscoreHeader.textContent = 'All-time high Scores:';
  highscores.appendChild(highscoreHeader);
  highscores.appendChild(scoreListEl);

  var allScores = JSON.parse(localStorage.getItem('userScores'));

  if (allScores) {
    allScores.sort((a, b) => b.time - a.time);

    for (var i = 0; i < allScores.length; i++) {
      var userScoreEl = document.createElement('li');
      userScoreEl.textContent = allScores[i].name + ' - ' + allScores[i].time;
      highscores.appendChild(userScoreEl);
    }
  }
  
 

  goBackButton.textContent = 'Go Back';
  goBackButton.setAttribute('id', 'back');
  highscores.appendChild(goBackButton);

  clearHighScores.textContent = 'Clear Highscores';
  highscores.appendChild(clearHighScores);
}





