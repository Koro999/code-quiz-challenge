//Query Selector for main cards that need to be navigated through
var introductionPage = document.querySelector("#introductionPage") //fixed page
var quizPage = document.querySelector("#quizPage") //needs to be cleared 
var highscorePage = document.querySelector("#highscorePage") //somethings need to be cleared 

var timer = 60; 
var timeStart = document.querySelector('#timer')


//Query Selector values for buttons
var startQuiz = document.querySelector("#startQuiz")

//startQuiz button. swap to quiz page, start timer
startQuiz.addEventListener("click", function(){
    introductionPage.setAttribute("style", "display:none");
    quizPage.setAttribute("style", "display:visible");


    //sets timer to one minute to do the quiz 
    timeStart.textContent = timer;
    var timerCountdown = setInterval (function() {
        timer--;
        timeStart.textContent = timer; 

        if (timer == 0) {
            clearInterval(timerCountdown);
            quizPage.setAttribute("style", "display:none");
            highscorePage.setAttribute("style", "display:visible"); //lose, still register score 
        }        
        },1000)
})