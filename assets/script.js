// variables
var startEl = document.querySelector('#startButton');
var timeEl = document.querySelector('.time');
var questionEl = document.getElementById('question');
var questionArea = document.getElementById('questionarea');
var secondsLeft = 20;
var currentQuestion;
var index = 1;

// timer function
startEl.addEventListener('click', function(event) {
  setTime();
  questionEl.textContent = question1.question;
  choiceA.textContent = question1.answerChoices[0];
  choiceB.textContent = question1.answerChoices[1];
  choiceC.textContent = question1.answerChoices[2];
  choiceD.textContent = question1.answerChoices[3];
});

// answer event listener
questionArea.addEventListener('click', function(event) {
  navigateQuestions(event.target.id);
});

timeEl.textContent = 'Time: ' + secondsLeft ;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = 'Time: ' + secondsLeft ;

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      secondsLeft = 3;
    }

  }, 1000);
}

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


function navigateQuestions(id) {
  console.log('index', index);
  
  console.log('id', id);

  // if (!questions[index + 1]) {
  //   return;
  //   // store timeremain as highscore val n spit to submit initials n high score page
  // }
  currentRightAnswer = questions[index - 1].isCorrect;

  if (!questions[index]) {
    console.log('done');
    return;
  }
  if (id === currentRightAnswer) {
    console.log('you got one right');
  } else {
    secondsLeft = secondsLeft - 10;
    console.log('you better have gotten it wrong');
  }

  currentQuestion = questions[index].question;
  currentAnswers = questions[index].answerChoices; // array
  console.log('currentRightAnswer', currentRightAnswer);
  // add textcontent
  questionEl.textContent = currentQuestion;
  choiceA.textContent = currentAnswers[0];
  choiceB.textContent = currentAnswers[1];
  choiceC.textContent = currentAnswers[2];
  choiceD.textContent = currentAnswers[3];

  index++;

}
 
