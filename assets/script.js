//Query Selector for main card containers that need to be navigated through
var introductionPage = document.querySelector("#introductionPage"); //fixed page
var quizPage = document.querySelector("#quizPage");//needs to be cleared 
var highscorePageSubmit = document.querySelector("#highscorePageSubmit"); //somethings need to be cleared 
var highscorePage = document.querySelector("#highscore"); //highscore page 

//timer variables 
var timer = 1000; 
var timeStart = document.querySelector('#timer');
var timerStop = false;

//Query Selector values for buttons
var startQuiz = document.querySelector("#startQuiz");

//Score count, 1 per correct answer 
var finalScore = document.querySelector("#finalScore");
var score = 0;
var questionNumber = 0;

//Query Selector for quiz questions, answers, and correct or incorrect 
var questionSelect = document.querySelector("#question") ;
var answerSelect = document.querySelector("#answers") ;
var rightWrong = document.querySelector("#rightWrong") ;

//Query Selector for score submit, go back and clear score, and initial inputbox, and score list
var submitScores = document.querySelector("#submitScore");
var scoreList = document.querySelector("#scoreList");
var goBack = document.querySelector("#goBack");
var clearScores = document.querySelector("#clearScores");
var initialInput = document.querySelector("#initials");

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

    //start generating Quiz questions
    quizGenerate();

    //starts the timer to do the quiz 
    timeStart.textContent = timer;
    var timerCountdown = setInterval (function() {
        timer--;
        timeStart.textContent = timer; 

        if (timer <= 0) {
            clearInterval(timerCountdown);
            submitScore ();
            quizPage.setAttribute("style", "display:none");
            highscorePageSubmit.setAttribute("style", "display:visible"); //lose, still register score 
        } else if (timerStop === true){
            clearInterval(timerCountdown)
        }    
    },1000)
})

//show the quiz content on the page and check answers 
function quizGenerate() {

    if (questionNumber > quizQuestions.length){ //
        return;
    }
    questionSelect.textContent= quizQuestions[questionNumber].question;
    
    var buttonNumber = 0;
    for(answer in quizQuestions[questionNumber].answers) {
        //generate buttonNumber for comparison later
        buttonNumber++;
        //console.log(buttonNumber);
        
        //create list elements
        var liElem = document.createElement("li");
        answerSelect.appendChild(liElem);
        answerSelect.setAttribute("style", "list-style: none;");
        answerSelect.setAttribute("class", "answerList");
        //console.log(answerSelect);
        //create buttons inside the list elements 
        var button = document.createElement("button");
        button.setAttribute("value", buttonNumber);
        button.setAttribute("class", "answerButton");
        button.setAttribute("style", "width: 80%; list-style:none; padding-left:0; text-align: left; position:relative; left:5%");
        button.innerHTML = `${answer}: ${quizQuestions[questionNumber].answers[answer]}`;     
        liElem.appendChild(button);
    }
    buttonNumber = 0;

    //event listener to check if answer clicked is correct 
    answerSelect.addEventListener("click", function(event) {
        var element = event.target; 

        const userAnswer = element.getAttribute('value') - 1;
        const abcd = ["a","b","c","d"];

        if (element.matches("button") === true) {
            if (abcd[userAnswer] === quizQuestions[questionNumber].correctAnswer){
                score++;

                rightWrong.textContent = "C O R R E C T" 
                var correctClear = setInterval(function () {
                    rightWrong.textContent = ""
                    clearInterval(correctClear);
                }, 2000);
                
                nextQuestion();
            }
            else{
                timer = timer - 10;

                rightWrong.textContent = "I N C O R R E C T"
                var wrongClear = setInterval(function () {
                    rightWrong.textContent = ""
                    clearInterval(wrongClear);
                }, 3000);
                nextQuestion();
            }
        }
    })

}

function nextQuestion () {
    var nextQuestion = setInterval(function(){
        //count up for the questions 
        questionNumber++; 

        //clear old buttons
        var removeButton = document.getElementById("answers");
        removeButton.remove();

        //recreate empty ol element
        var olElem = document.createElement("ol");
        olElem.setAttribute("id", "answers");
        quizPage.appendChild(olElem);
        answerSelect = document.querySelector("#answers"); 

        //if the question Number === the number of questions switch to the highscorePage
        if (questionNumber === quizQuestions.length){ //
            submitScore();
            clearInterval(nextQuestion);
            return;
        }
        //otherwise generate next question 
        else {
            quizGenerate ();
        }
        clearInterval(nextQuestion);
    },3000)
    
}

function submitScore() {
    //make sure correct and incorrect text is cleared 
    rightWrong.textContent = "";
    //swap pages 
    highscorePageSubmit.setAttribute("style", "display:visible");
    quizPage.setAttribute("style", "display: none");
    //stop timer and reset to 0
    timerStop = true;
    timer = 0;
    //store the score value 
    finalScore.textContent = score; 

    submitScores.addEventListener("click", function(event) {
        event.preventDefault();//prevent webpage from refreshing

        var recordedScore =
        {initials: initialInput.value,
        score: score }

        recordedScore.score = score; 

        if (initialInput.value === "") {
            alert("Please enter initials.")
          }
        else {
        localStorage.setItem("score", JSON.stringify(recordedScore)); //save score to local storage 
        
        highscorePageSubmit.setAttribute("style", "display:none");
        highscorePage.setAttribute("style", "display:visible");

        var showScores = document.createElement("li");
        scoreList.appendChild(showScores);
        scoreList.setAttribute("class", "scoreListStored");
        
        var newScore = JSON.parse(localStorage.getItem("score"));
        console.log(newScore);
        scoreList.textContent = `${newScore.initials} - ${newScore.score}`;
        scoreList.setAttribute("style", "list-style:none; padding-left:0;")
        }
    });
}