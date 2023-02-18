var startEl = document.querySelector("#startButton");
var timeEl = document.querySelector(".time");

startEl.addEventListener("click", function() {
  setTime();
});

var secondsLeft = 3;
timeEl.textContent = "Time: " + secondsLeft ;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft ;

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      secondsLeft = 3;
    }

  }, 1000);
}




