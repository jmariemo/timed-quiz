// variables
var timeDisplay = document.querySelector("#time-count");
var grade = document.querySelector("#grade");
var quizQuestion = document.getElementById("quiz-question");
var score = document.querySelector("#score");
var finalScore = document.querySelector("#final-score");
var completedIn = document.querySelector("#completed-in");
var submitButton = document.querySelector("#submit");
var scoreCount = 0;
var questionCount = 0;
var timeCount = 30;
var time;

// array of questions with corresponding answer choices and correct answer choice
var questions = [
    {
        question: "What does CSS do?",
        answers: ["Give the content style", "Give the content function", "Give the content structure", "Give the content movement"],
        correctAnswer: "Give the content style" 
    },
    {
        question: "What does API stand for?",
        answers: ["Application Programming Interface", "Application Plus Inscription", "Array Pod Intelligence", "Article Prime Instance"],
        correctAnswer: "Application Programming Interface"
    },
    {
        question:"What command is used to create and travel to a new new git branch?",
        answers: ["git add -A", "git checkout -b", "git commit -m", "git pull"],
        correctAnswer: "git checkout -b"
    },
    {
        question: "In CSS, what does the margin represent?",
        answers: ["The amount of space around the page", "The amount of space around the inside of an element", "The border around the print", "The amount of space around the outside of an element"],
        correctAnswer: "The amount of space around the outside of an element"
    },
    {
        question: "In HTML, what is an element?",
        answers: ["The content inside of angle brackets", "The entire content from opening tag to closing tag", "Space between classes", "The title of an ID"],
        correctAnswer: "The entire content from opening tag to closing tag"
    }
]

//function to check user's answer against correct answer, deduct time if incorrect, add point to score if correct, and reassign DOM elements to next question in array
function checkAnswer(event) {
    var correctAnswer = questions[questionCount].correctAnswer;
    var userAnswer = event.target.textContent;
    if (userAnswer === correctAnswer) {
        grade.textContent = "Correct!";
        scoreCount += 1;
    } else {
        grade.textContent = "Incorrect!"
        timeCount -= 5;
    }
    score.textContent = "Score: " + scoreCount + " / 5";
    questionCount++;
    if(questionCount < questions.length && timeCount >= 0) {
        quiz()
    } else {
        saveScore()
    }
}

function saveScore() {
    document.getElementById("quiz-page").style.display="none";
    document.getElementById("save-page").style.display="flex";
    clearInterval(time);
    finalScore.textContent = scoreCount + " / 5 " + "in " + (30 - timeCount) + " seconds!";
    localStorage.setItem("scoreTime", finalScore.textContent);
}

// function to assign questions to DOM elements and listen to user's answer choice via click, then check user's answer against correct answer
function quiz() {
    var answer1 = document.querySelector("#answer-1");
    var answer2 = document.querySelector("#answer-2");
    var answer3 = document.querySelector("#answer-3");
    var answer4 = document.querySelector("#answer-4");
    quizQuestion.textContent = questions[questionCount].question;
    var quizAnswer1 = document.getElementById("answer-1");
    quizAnswer1.textContent = questions[questionCount].answers[0];
    var quizAnswer2 = document.getElementById("answer-2");
    quizAnswer2.textContent = questions[questionCount].answers[1];
    var quizAnswer3 = document.getElementById("answer-3");
    quizAnswer3.textContent = questions[questionCount].answers[2];
    var quizAnswer4 = document.getElementById("answer-4");
    quizAnswer4.textContent = questions[questionCount].answers[3];
    quizAnswer1.addEventListener("click", checkAnswer);
    quizAnswer2.addEventListener("click", checkAnswer);
    quizAnswer3.addEventListener("click", checkAnswer);
    quizAnswer4.addEventListener("click", checkAnswer);
}

// function to start timer and stop timer and send user to score page at 0 seconds
function startTime() {
    time = setInterval(function() {
        timeCount--;
        timeDisplay.textContent = timeCount + " seconds remaining";
        if (timeCount <= 0) {
            clearInterval(time);
            timeCount = 0;
            saveScore();
        }
    }, 1000);
}

// start quiz: hide start page, show quiz page, run quiz function
document.getElementById("start-button").addEventListener("click", function() {
    document.getElementById("start-page").style.display="none";
    document.getElementById("quiz-page").style.display="flex";
    scoreCount = 0;
    questionCount = 0;
    grade.textContent = "";
    score.textContent = "Score: " + scoreCount + " / 5";
    startTime();
    quiz();
})

// function to save user initials, display user initials on score page
document.getElementById("submit").addEventListener("click", function() {
    var userInput = document.getElementById("initials");
    var userInitials = userInput.value;
    if(userInitials !== "") {
        var scoreInitials = document.getElementById("score-initials")
        var initialH = document.createElement("h4");
        initialH.textContent = userInitials + " answered correctly " + localStorage.getItem("scoreTime");
        scoreInitials.appendChild(initialH);
        userInput.value = "";
        document.getElementById("submit").style.display="none";
    }
})

// function to reset time counter
function clearTime() {
    clearInterval(time);
    timeCount = 30;
    timeDisplay.textContent = timeCount + " seconds remaining";
}

// function to show score page from any other page, hide any other pages that may be open
document.getElementById("show-scores").addEventListener("click", function() {
    document.getElementById("start-page").style.display="none";
    document.getElementById("quiz-page").style.display="none";
    document.getElementById("save-page").style.display="none";
    document.getElementById("score-page").style.display="flex";
    clearTime();
})

// function to show home page from any other page, hide any other pages that may be open
document.getElementById("home-page").addEventListener("click", function() {
    document.getElementById("start-page").style.display="flex";
    document.getElementById("quiz-page").style.display="none";
    document.getElementById("save-page").style.display="none";
    document.getElementById("score-page").style.display="none";
    clearTime();
})


// is there a way to refactor functions to hide other pages while showing single page (lines 138 - 154)?
// nav heading styling shifts when timeCount changes to single digit
