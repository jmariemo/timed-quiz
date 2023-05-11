// variables
var startButton = document.querySelector("#start-button");
var timeDisplay = document.querySelector("#time-count");
var time;
var timeCount = 30;
var answer1 = document.querySelector("#answer-1");
var answer2 = document.querySelector("#answer-2");
var answer3 = document.querySelector("#answer-3");
var answer4 = document.querySelector("#answer-4");
var questionCount = 0;
var grade = document.querySelector("#grade");
var quizQuestion = document.getElementById("quiz-question");
var score = document.querySelector("#score");
var finalScore = document.querySelector("#finalScore");
scoreCount = 0;
var submitButton = document.querySelector("#submit");
var win;

// array of questions and answers
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

function quiz() {
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

// start quiz: hide start page, show quiz page, run quiz function
startButton.addEventListener("click", function() {
    document.getElementById("start-page").style.display="none";
    document.getElementById("quiz-page").style.display="flex";
    startTime();
    quiz();
})

// function to start timer, close quiz once timer reaches 0 seconds
function startTime() {
    time = setInterval(function() {
        timeCount--;
        timeDisplay.textContent = timeCount + " seconds remaining";
        if (timeCount >= 0) {
            if (win && timeCount > 0) {
                clearInterval(time);
                winQuiz();
            }
        }
        if (timeCount <= 0) {
            clearInterval(time);
            loseQuiz();
        }
    }, 1000);
}

function checkAnswer(event) {
    var correctAnswer = questions[questionCount].correctAnswer;
    var userAnswer = event.target.textContent;
    if (userAnswer === correctAnswer) {
        grade.textContent = "Correct!";
        scoreCount += 1;
        score.textContent = "Score: " + scoreCount + " / 5";
    } else {
        grade.textContent = "Incorrect!"
        timeCount -= 5;
    }
    questionCount++;
    if(questionCount < questions.length) {
        quiz()
    } else {
        saveScore()
    }
}

startButton.addEventListener("click", function() {
    document.getElementById("start-page").style.display="none";
    document.getElementById("quiz-page").style.display="flex";
    startTime();
    quiz();
})

function saveScore() {
    document.getElementById("quiz-page").style.display="none";
    document.getElementById("save-page").style.display="flex";
    finalScore.textContent = scoreCount + " / 5";
}

