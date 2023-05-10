//Query Selector for main card containers that need to be navigated through
var introductionPage = document.querySelector("#introductionPage") //fixed page
var quizPage = document.querySelector("#quizPage") //needs to be cleared 
var highscorePage = document.querySelector("#highscorePage") //somethings need to be cleared 

//timer variables 
var timer = 6969; 
var timeStart = document.querySelector('#timer')

//Query Selector values for buttons
var startQuiz = document.querySelector("#startQuiz")

//Score count, 1 per correct answer 
var score = 0;
var questionNumber = 0;

//Query Selector for quiz questions, answers, and correct or incorrect 
var questionSelect = document.querySelector("#question") 
var answerSelect = document.querySelector("#answers") 
var rightWrong = document.querySelector("#rightWrong") 

//quiz questions and answer storage in an Array
const quizQuestions = [
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
    
    //setting quizPage to show
    quizPage.setAttribute("style", "display:visible");
    questionSelect.setAttribute("style", "display:visible");
    answerSelect.setAttribute("style", "display:visible");
    rightWrong.setAttribute("style", "display:visible");

    quizGenerate();

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

//show the quiz content on the page and check answers 
function quizGenerate() {
    questionSelect.textContent= quizQuestions[questionNumber].question;
    var buttonNumber = 0;

    for(answer in quizQuestions[questionNumber].answers) {
        //generate buttonNumber for comparison later
        buttonNumber++;
        //console.log(buttonNumber);
        
        //create list elements
        var liElem = document.createElement("li");
        answerSelect.appendChild(liElem);
        answerSelect.setAttribute("style", "list-style: none;")
        answerSelect.setAttribute("class", "answerList")
        console.log(answerSelect);
        //create buttons inside the list elements 
        var button = document.createElement("button")   
        button.setAttribute("value", buttonNumber)
        button.innerHTML = `${answer}: ${quizQuestions[questionNumber].answers[answer]}`;     
        liElem.appendChild(button);
    }

    //event listener to check if answer clicked is correct 
    answerSelect.addEventListener("click", function(event) {
        var element = event.target; 

        const userAnswer = element.getAttribute('value') - 1;
        const abcd = ["a","b","c","d"];

        if (element.matches("button") === true) {
            if (abcd[userAnswer] === quizQuestions[questionNumber].correctAnswer){
                score++;
                var correct = setInterval(function () {
                    rightWrong.textContent = "C O R R E C T"
                    clearInterval(correct);
                }, 3000);
                nextQuestion();
            }
            else{
                timer = timer - 10;
                var wrong = setInterval(function () {
                    rightWrong.textContent = "I N C O R R E C T"
                    clearInterval(wrong);
                }, 3000);
                nextQuestion();
            }
        }
    })

}

function nextQuestion () {
    var nextQuestion = setInterval(function(){
        questionNumber++;
        for(answer in quizQuestions[questionNumber].answers) {
            answerList = document.getElementById("answers");
            answerList.removeChild();
        }
        clearInterval(nextQuestion);
    },3000)
    quizGenerate ();
}