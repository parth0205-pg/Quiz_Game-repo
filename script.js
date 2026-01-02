// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");
const feedbackForm = document.getElementById("feedback-form");
const feedbackName = document.getElementById("feedback-name");
const feedbackText = document.getElementById("feedback-text");

//Quiz questions
const quizQuestions = [
  {
    question: "What does CPU stand for?",
    answers: [
      { text: "Central Process Unit", correct: false },
      { text: "Central Processing Unit", correct: true },
      { text: "Computer Personal Unit", correct: false },
      { text: "Central Processor Union", correct: false },
    ],
  },
  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "JQuery", correct: false },
      { text: "CSS", correct: true },
      { text: "XML", correct: false },
    ],
  },
  {
    question: "Who is known as the father of the computer?",
    answers: [
      { text: "Alan Turing", correct: false },
      { text: "Charles Babbage", correct: true },
      { text: "Thomas Edison", correct: false },
      { text: "Bill Gates", correct: false },
    ],
  },
  {
    question: "What is the full form of RAM?",
    answers: [
      { text: "Random Access Memory", correct: true },
      { text: "Read Access Memory", correct: false },
      { text: "Read Anywhere Memory", correct: false },
      { text: "Random Accept Memory", correct: false },
    ],
  },
  {
    question: "Which company owns the Android operating system?",
    answers: [
      { text: "Microsoft", correct: false },
      { text: "Apple", correct: false },
      { text: "Google", correct: true },
      { text: "IBM", correct: false },
    ],
  },
  {
    question: "What does HTTP stand for in a website address?",
    answers: [
      { text: "HyperText Transfer Protocol", correct: true },
      { text: "HyperText Transmission Protocol", correct: false },
      { text: "HighText Transfer Protocol", correct: false },
      { text: "HyperText Transfer Platform", correct: false },
    ],
  },
  {
    question: "Which key combination is commonly used to copy text?",
    answers: [
      { text: "Ctrl + V", correct: false },
      { text: "Ctrl + X", correct: false },
      { text: "Ctrl + C", correct: true },
      { text: "Alt + C", correct: false },
    ],
  },
  {
    question: "What is the binary value of the decimal number 5?",
    answers: [
      { text: "101", correct: true },
      { text: "110", correct: false },
      { text: "011", correct: false },
      { text: "111", correct: false },
    ],
  },
  {
    question: "Which symbol is used for comments in Python?",
    answers: [
      { text: "//", correct: false },
      { text: "/*", correct: false },
      { text: "#", correct: true },
      { text: "<!--", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// even listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);


function startQuiz(){
    // reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion(){
    // reset state
    answersDisabled = false

    const currentQuestion = quizQuestions[currentQuestionIndex]

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("answer-btn")

        //what is dataset? It's property of data that allows to store custom data
        button.dataset.correct = answer.correct

        button.addEventListener("click",selectAnswer)

        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    // optimization check
    if (answersDisabled) return

    answersDisabled = true

    const selectButton = event.target;
    const isCorrect = selectButton.dataset.correct === "true"

    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }else if (button === selectButton) {
            button.classList.add("incorrect")
        }
    })

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score
    }

    setTimeout(() => {
        currentQuestionIndex++;
// check if there are more questions or if the quiz is over
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion()
        }
        else{
            showResults()
        }
    },1000)
}

function showResults(){
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")
    
    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100

    if(percentage === 100) {
        resultMessage.textContent = "Well Done! You are Einstein";
    }
    else if (percentage >= 90) {
        resultMessage.textContent = "Nice! You just miss Einstein Tag";
    }
    else if (percentage >= 80) {
        resultMessage.textContent = "Good! Practise more to get Einstein Tag";
    }
    else if (percentage >= 70) {
        resultMessage.textContent = "Not Bad! Who wants Einstein Tag";
    }
    else if (percentage >= 60) {
        resultMessage.textContent = "Avrage! No proble. Not everyone is Einstein";
    }
    else if (percentage >= 50) {
        resultMessage.textContent = "Below avrage! Is this Okay for you? Ask yourself";
    }
    else {
        resultMessage.textContent = "chee sasur! Tumse na ho payega beta";
    }

}

feedbackForm.addEventListener("submit", function(event) {
    // Prevent the page from reloading (default form behavior)
    event.preventDefault();

    const name = feedbackName.value;
    const text = feedbackText.value;

    if(name && text) {
        // Here you would usually send data to a server. 
        // For now, we just alert the user.
        alert(`Thank you ${name}! We received your feedback: "${text}"`);
        
        // Clear the form
        feedbackForm.reset();
    }
});

function restartQuiz(){
    resultScreen.classList.remove("active");

    startQuiz();
}
