const questions = [{
  question: 'Which is the largest animal in the world?',
  answers:[
    {text:'Shark', correct:false},
    {text:'Blue Whale', correct:true},
    {text:'Elephant', correct:false},
    {text:'Dinosaur', correct:false}
  ]
},
{
  question: 'Which is the smallest country in the world?',
  answers:[
    {text:'Vatican City', correct:true},
    {text:'India', correct:false},
    {text:'Maldives', correct:false},
    {text:'China', correct:false}
  ]
},
{
  question: 'Which is largest desert in the world?',
  answers:[
    {text:'Sahara', correct:true},
    {text:'Gobi', correct:false},
    {text:'Mustang', correct:false},
    {text:'Kalahari', correct:false}
  ]
},
{
  question: 'Which is the smallest continent in the world?',
  answers:[
    {text:'Asia', correct:false},
    {text:'Europe', correct:false},
    {text:'Australia', correct:true},
    {text:'Antartica', correct:false}
  ]
}
];

const question = document.querySelector('.q-and-a-box h3');
const answerContainer = document.querySelector('.answers-container');
const nextButton = document.querySelector('.next-button');


let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
  let currentQuestionIndex = 0;
  let score = 0;
  nextButton.innerHTML = 'Next';
  displayQuestions();
}
function displayQuestions(){
  resetState();
  let currentData = questions[currentQuestionIndex];
  question.innerHTML = `${currentQuestionIndex + 1}. ${currentData.question}`;

  currentData.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerContainer.appendChild(button);
    if(answer.correct){
      button.dataset.check = 'correct';
    }
    
    button.addEventListener('click', (e) => {
      if(e.currentTarget.dataset.check){
        e.currentTarget.style.backgroundColor = 'lightgreen';
        e.currentTarget.style.color = 'black';
        score++;
      }
      else{
        e.currentTarget.style.backgroundColor = 'lightpink';
        e.currentTarget.style.color = 'black';
      }

    Array.from(answerContainer.children).forEach((button) => {
      if(button.dataset.check){
        button.style.backgroundColor = 'lightgreen';
        button.style.color = 'black';
      }
      button.disabled = true;
    });
  
    nextButton.style.display = 'block';
    })

   

  });
}

function resetState(){
  nextButton.style.display = 'none';
  while(answerContainer.firstChild){
    answerContainer.removeChild(answerContainer.firstChild);
  }
}


nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    displayQuestions();
  }
  else{
    question.innerHTML = `Your score is ${score} out of ${questions.length}`;
    resetState();
    nextButton.style.display = 'block';
    nextButton.innerHTML = 'Play Again';
    currentQuestionIndex = -1;
  }

});

startQuiz();