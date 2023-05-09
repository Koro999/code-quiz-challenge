//Query Selector for main cards that need to be navigated through
var introductionPage = document.querySelector("#introductionPage") //fixed page
var quizPage = document.querySelector("#quizPage") //needs to be cleared 
var highscorePage = document.querySelector("#highscorePage") //somethings need to be cleared 

//timer variables 
var timer = 60; 
var timeStart = document.querySelector('#timer')

//Query Selector values for buttons
var startQuiz = document.querySelector("#startQuiz")

//quiz questions and answer storage
var questions = [
{
    question: "Which of the following is correct about JavaScript?",
    answers: {
        a: "JavaScript is an Object-Based language", 
        b: "JavaScript is Assembly-language",
        c: "JavaScript is an Object-Oriented language",
        d: "JavaScript is a High-level language"
    },
    correctAnswer: "a"
},
{
    question: "Arrays in JavaScript are defined by which of the following statements?",
    answers: {
        a: "It is an ordered list of values" ,
        b: "It is an ordered list of objects",
        c: "It is an ordered list of string",
        d: "It is an ordered list of functions"
    },
    correctAnswer: "a"
},
{
    question: "What is CSS?",
    answers: {
        a: "CSS is a style sheet language",
        b: "CSS is designed to separate the presentation and content, including layout, colors, and fonts",
        c: "CSS is the language used to style the HTML documents",
        d: "All of the mentioned"
    },
    correctAnswer: "d"
},
{
    question: "Which of the following CSS selectors are used to specify a group of elements?",
    answers: {
        a: "tag", 
        b: "id",
        c: "class",
        d: "both class and tag"
    },
    correctAnswer: "c"
},
{
    question: "What is HTML?",
    answers: {
        a: "HTML describes the structure of a webpage", 
        b: "HTML is the standard markup language mainly used to create web pages",
        c: "HTML consists of a set of elements that helps the browser how to view the content",
        d: "All of the mentioned"
    },
    correctAnswer: ""
},
{
    question: "What is DOM in HTML?",
    answers: {
        a: "Language dependent application programming",
        b: "Hierarchy of objects in ASP.NET",
        c: "Application programming interface",
        d: "Convention for representing and interacting with objects in html documents"
    },
    correctAnswer: "d"
}
]

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