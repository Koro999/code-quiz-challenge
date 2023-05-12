//Query Selector for main card containers that need to be navigated through
var introductionPage = document.querySelector("#introductionPage"); //fixed page
var quizPage = document.querySelector("#quizPage");//needs to be cleared 
var highscorePageSubmit = document.querySelector("#highscorePageSubmit"); //somethings need to be cleared 
var highscorePage = document.querySelector("#highscore"); //highscore page 

//Query Selector for highscore page and score submit pages 
var submitScores = document.querySelector("#submitScore");
var viewHighscore = document.querySelector("#viewHighscore");
var scoreList = document.querySelector("#scoreList");
var goBack = document.querySelector("#goBack");
var clearScores = document.querySelector("#clearScores");
var initialInput = document.querySelector("#initials");

//Query Selector for buttons in document 
var buttons = document.querySelectorAll('button');

//timer variables 
var timer; 
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

// set an object to store into local storage
var recordedScore =[[],[]]

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

function nextQuestion () {
    var nextQuestion = setInterval(function(){
        //count up for the questions 
        questionNumber++; 

        clearButtons();

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
}

function clearButtons () { //clear question buttons and recreate ol for new buttons 
    //clear old buttons
    var removeButton = document.getElementById("answers");
    removeButton.remove();

    //recreate empty ol element
    var olElem = document.createElement("ol");
    olElem.setAttribute("id", "answers");
    quizPage.appendChild(olElem);
    answerSelect = document.querySelector("#answers"); 
}

function clearScoreList () { //clear score list
    //removes the ol element containing the highscore values
    var removeHighscore = document.getElementById("scoreList");
    removeHighscore.remove();

    //recreate empty ol element
    var scoreOl = document.createElement("ol");
    scoreOl.setAttribute("id", "scoreList");
    highscorePage.insertBefore(scoreOl, highscorePage.children[1])
    scoreList = document.querySelector("#scoreList");
}

//show the quiz content on the page and check answers 
function quizGenerate() {
    //checks to see if we are at the end of questions, if we are end function
    if (questionNumber > quizQuestions.length){ //
        clearButtons ();
        return;
    }
    //reset timer value so that it will countdown
    timerStop = false;
    
    //set the text to the current question
    questionSelect.textContent= quizQuestions[questionNumber].question;
    
    var buttonNumber = 0; 
    for(answer in quizQuestions[questionNumber].answers) {
        //generate buttonNumber for comparison later
        buttonNumber++;
        
        //create list elements
        var liElem = document.createElement("li");
        answerSelect.appendChild(liElem);
        answerSelect.setAttribute("style", "list-style: none;");
        answerSelect.setAttribute("class", "answerList");
        
        //create buttons inside the list elements 
        var button = document.createElement("button");
        button.setAttribute("value", buttonNumber);
        button.setAttribute("class", "answerButton");
        button.setAttribute("style", "width: 80%; list-style:none; padding-left:0; text-align: left; position:relative; left:5%");

        //set the content of the button and append it
        button.innerHTML = `${answer}: ${quizQuestions[questionNumber].answers[answer]}`;     
        liElem.appendChild(button);
    }
    buttonNumber = 0; //reset buttonNumber value for the next iteration

    
    //event listener to check if answer clicked is correct 
    answerSelect.addEventListener("click", function(event) {
        var element = event.target;  //create variable to see which element is being clicked
        
        //disables all the answer buttons after clicked once 
        buttons = document.querySelectorAll('button');
        buttons.forEach((answerButton) => {
            if( answerButton.getAttribute("class") === "answerButton"){
                answerButton.setAttribute('disabled', 'true')
            }
        });


        const userAnswer = element.getAttribute('value') - 1;
        const abcd = ["a","b","c","d"];

        //if the element clicked is a button do this 
        if (element.matches("button") === true) {
            //if the answer is correct do this 
            if (abcd[userAnswer] === quizQuestions[questionNumber].correctAnswer){
                score++;

                rightWrong.textContent = "C O R R E C T" 
                var correctClear = setInterval(function () {
                    rightWrong.textContent = ""
                    clearInterval(correctClear);
                }, 2000);
                
                nextQuestion();
            }
            else{ //if the answer is incorrect do this 
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

startQuiz.addEventListener("click", function(){ //start the quiz when this button is clicked :)
    //reset values to default 
    clearScoreList();
    clearButtons ();
    questionNumber = 0;
    score= 0;
    timer = 10;

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

        //if timer equals 0 or less than 0 do this 
        if (timer <= 0) {            
            clearInterval(timerCountdown);
            submitScore ();
    
            quizPage.setAttribute("style", "display:none");
            highscorePageSubmit.setAttribute("style", "display:visible"); 
        } else if (timerStop === true){
            clearInterval(timerCountdown)
        }    
    },1000)

    
})

submitScores.addEventListener("click", function(event) { //submit initial and score to be saved when this button clicked
    event.preventDefault();//prevent webpage from refreshing
    //check for empty field 
    if (initialInput.value === "") {
        alert("Please enter initials.")
        return;
      }

    //push the input and the score into their respective arrays
    recordedScore[0].push(initialInput.value.trim()); 
    recordedScore[1].push(score);

    //save the object to local storage as a string to recall for later 
    localStorage.setItem("score", JSON.stringify(recordedScore)); 
    
    //create for loop to iterate through the arrays. since score and initials are always equal pick one to grab length for 
    for (var index = 0; index < recordedScore[0].length; index++) {

        //var initialListStore =  recordedScore[0][index]; //loop through initials 
        //var scoreListStore = recordedScore[1][index]; //loop through scores

        var showScores = document.createElement("li"); //create li
        //showScores.setAttribute("data-index", index); 
        showScores.textContent = `${recordedScore[0][index]} - ${recordedScore[1][index]}`;//set text depending on index value

        //var newScore = JSON.parse(localStorage.getItem("score"));
        
        scoreList.appendChild(showScores); //append into existence
    }
    
    //change pages once score is submitted
    highscorePageSubmit.setAttribute("style", "display:none");
    highscorePage.setAttribute("style", "display:visible");
    })

clearScores.addEventListener("click", function(event) { //clear scores array
    clearScoreList ();
    recordedScore =[[],[]]
})

goBack.addEventListener("click", function(event) { //go back to main page
    introductionPage.setAttribute("style", "display:visible")
    highscorePage.setAttribute("style", "display:none");
})

viewHighscore.addEventListener("click", function(event) { //view the highscore page 
    event.preventDefault(); //prevent page refresh 
    timerStop = true; //stop timer 

    //disable this on specific pages 
    if (highscorePageSubmit.getAttribute("display") === "visible" || highscorePage.getAttribute === "visible"){ 
        return;
    }

    introductionPage.setAttribute("style", "display: none");
    quizPage.setAttribute("style", "display: none");
    highscorePage.setAttribute("style", "display:visible");
})