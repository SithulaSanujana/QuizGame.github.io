const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text:"Shark",correct: false},
            {text:"Blue whale",correct: true},
            {text:"Elephant",correct: false},
            {text:"Girraffe",correct: false},
        ]
    },
    {
        question: "Which  is the smallest country in the world?",
        answers: [
            {text:"Vatican City",correct: true},
            {text:"Bhutan",correct: false},
            {text:"Nepal",correct: false},
            {text:"Sri Lanka",correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text:"Kalahari",correct: false},
            {text:"Gobi",correct: false},
            {text:"Sahara",correct: false},
            {text:"Antarctica",correct: true},
        ]
    },
    {
        question: "Which  is the smallest continent in the world?",
        answers: [
            {text:"Asia",correct: false},
            {text:"Australia",correct: true},
            {text:"Arctic",correct: false},
            {text:"Africa",correct: false},
        ]
    },
    {
        question: "What is the largest island in the world?",
        answers: [
            {text:"Madagascar",correct: false},
            {text:"Green Land",correct: true},
            {text:"Sri Lanka",correct: false},
            {text:"Sumatra",correct: false},
        ]
    },
    {
        question: "What is the biggest mountain in the world",
        answers: [
            {text:"Niagara Falls",correct: false},
            {text:"Victoria Falls",correct: false},
            {text:"Tugela Falls",correct: false},
            {text:"Angel Falls",correct: true},
        ]
    },
    {
        question: "What is the capital city of Australia?",
        answers: [
            {text:"Sydney",correct: false},
            {text:"Melbourne",correct: false},
            {text:"Canberra",correct: true},
            {text:"Brisbane",correct: false},
        ]
    },
    {
        question: "Which of the following mountain ranges is the longest in the world?",
        answers: [
            {text:"Andes",correct: false},
            {text:"Himalayas",correct: true},
            {text:"Alps",correct: false},
            {text:"Rockies",correct: false},
        ]
    },
    {
        question: "Which continent is known as the 'Land of the Rising Sun'?",
        answers: [
            {text:"Asia",correct: true},
            {text:"Africa",correct: false},
            {text:"Australia",correct: false},
            {text:"Europe",correct: false},
        ]
    },
    {
        question: "Which river is the longest in the world?",
        answers: [
            {text:"Yangtze",correct: false},
            {text:"Amazon",correct: false},
            {text:"Nile",correct: true},
            {text:"Mississippi",correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const winmsg = document.getElementById("win-msg");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}

function resetState(){

    winmsg.style.display = "none";
    nextButton.style.display = "none";
  
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }   
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    if(questions.length == score)
        {
            winmsg.style.display = "block";
        }else{
            winmsg.style.display = "none";
        }
   

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});



startQuiz();
