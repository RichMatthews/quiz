let questionList = [{
  question: {
    questionText: 'What is 5+5?',
    answers: {
      optionOne: 8,
      optionTwo: 5,
      optionThree: 10,
      optionFour: 2
    }
  },
},
{
  question: {
    questionText: 'What is the capital of Sweden?',
    answers: {
      optionOne: 'Malmo',
      optionTwo: 'Stockholm',
      optionThree: 'Gothenburg',
      optionFour: 'Copenhagen'
    }
  }
},
{
  question: {
    questionText: 'What is the capital of Germany?',
    answers: {
      optionOne: 'Berlin',
      optionTwo: 'Munich',
      optionThree: 'Dusseldorf',
      optionFour: 'Bremen'
    }
  }
}
];

let answerList = {
  questionOne: {
    answer: 10
  },
  questionTwo: {
    answer: 'Stockholm'
  },
  questionThree: {
    answer: 'Berlin'
  }
}


let i = 0;
let container = document.getElementById("container");
let questionSection = document.getElementById("questionSection");
let answerSection = document.getElementById("answerSection");
let answers;
let questionText = document.createTextNode(questionList[0].question.questionText);
container.appendChild(questionSection);
container.appendChild(answerSection);
questionSection.appendChild(questionText);

document.getElementById('nextButton').addEventListener("click", function(){
  document.getElementById('questionSection').textContent = nextQuestion();
})
document.getElementById('finishQuizBtn').addEventListener("click", function(){
  outOfQuestions()
})

questionAnswers()

function nextQuestion() {
  i = i + 1;
  submitAnswer();
  questionAnswers();
  if (questionList[i].question.questionText){
    return questionList[i].question.questionText
  }
  else {
    return 'no more questions'
  }
}

function questionAnswers() {
  let radios = document.getElementsByTagName('input');
  let arr = Object.values(questionList[i].question.answers)
  let questionNumberArray = ['One', 'Two', 'Three', 'Four'];
  questionNumberArray.forEach(function(questionNumber, i){
    document.getElementById('option' + questionNumber).innerHTML = arr[i]
    radios[i].value = document.getElementById('option' + questionNumber).innerHTML
  })
}

function removePreviousAnswer() {
  container.removeChild(answerSection)
}

function outOfQuestions() {
  let score = 0;
  let percentage;
  let rounded;
  if (localStorage.answerOne == answerList.questionOne.answer) {
    score += 1;
  }
  if (localStorage.answerTwo === answerList.questionTwo.answer) {
    score += 1;
  }
  if (localStorage.answerThree === answerList.questionThree.answer) {
    score += 1;
  }
  percentage = (score / questionList.length) * 100;
  rounded = Math.round(percentage)
  document.getElementById("score").innerHTML = `You scored ${score}/3, which is ${rounded}%`
}

let questionNumber = ['One', 'Two', 'Three', 'Four'];
function submitAnswer() {
  let radios = document.getElementsByTagName('input');
  let answer;
    for (let i=0; i < radios.length; i++){
      if (radios[i].type === 'radio' && radios[i].checked){
        answer = radios[i].value
        localStorage.setItem('answer' + questionNumber[0], answer)
        questionNumber.shift();
      }
    }
}
