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
    question: "What is the capital of India?",
    answers: [
      { text: "Ahmedabad", correct: false },
      { text: "Mumbai", correct: false },
      { text: "Delhi", correct: true },
      { text: "Benglor", correct: false },
    ],
  },
  {
    question: "What is the national animal of India?",
    answers: [
      { text: "Lion", correct: false },
      { text: "Tiger", correct: true },
      { text: "Elephant", correct: false },
      { text: "Cow", correct: false },
    ],
  },
  {
    question: "Which river is considered the holiest in India?",
    answers: [
      { text: "Brahmaputra", correct: false },
      { text: "Yamuna", correct: false },
      { text: "Godavari", correct: false },
      { text: "Ganga", correct: true },
    ],
  },
  {
    question: "Which Indian state is known as the 'Land of Five Rivers'?",
    answers: [
      { text: "Haryana", correct: false },
      { text: "Rajasthan", correct: false },
      { text: "Panjab", correct: true },
      { text: "Uttar Pradesh", correct: false },
    ],
  },
  {
    question: "Which monument is known as the symbol of love in India?",
    answers: [
      { text: "India Gate", correct: false },
      { text: "Charminar", correct: false },
      { text: "Taj Mahal", correct: true },
      { text: "Qutub Minar", correct: false },
    ],
  },
  {
    question: "Which festival is known as the 'Festival of Lights'?",
    answers: [
      { text: "Navratri", correct: false },
      { text: "Diwali", correct: true },
      { text: "Holi", correct: false },
      { text: "Ganesh chaturthi", correct: false },
    ],
  },
  {
    question: "Which Indian state is famous for tea plantations in Darjeeling?",
    answers: [
      { text: "Kerala", correct: false },
      { text: "Assam", correct: false },
      { text: "West Bengal", correct: true },
      { text: "Tamil Nadu", correct: false },
    ],
  },
  {
    question: "What is the speciality of Gujrat",
    answers: [
      { text: "Garba, Sweet food, Sparrow, Statue of Unity", correct: false },
      { text: "Bhangda, Sweet food, Lion, Red fort", correct: false },
      { text: "Garba, Spicy food, Lion, Statue of Unity", correct: false },
      { text: "Garba, Sweet food, Lion, Statue of Unity", correct: true },
    ],
  },
  {
    question: "Which Indian city is known as the 'Silicon Valley of India'?",
    answers: [
      { text: "Bengaluru", correct: true },
      { text: "Mumbai", correct: false },
      { text: "Hyderabad", correct: false },
      { text: "Pune", correct: false },
    ],
  },
  {
    question: "Which is the national sport of India?",
    answers: [
      { text: "Hockey", correct: true },
      { text: "Kabaddi", correct: false },
      { text: "Football", correct: false },
      { text: "Cricket", correct: false },
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
