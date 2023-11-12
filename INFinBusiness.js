const quizData = [
  {
    question: 'Streamlining is a benefit of an integrated information system in a business?',
    options: ['Yes', 'No'],
    answer: 'Yes',
  },
  {
    question: 'What is an analytical CRM?',
    options: [
      'It used when working with customers as individuals.',
      'It is used when working with customers as a group.',
      'It connects all the functional areas in a business.'],
    answer: 'It is used when working with customers as a group.',
  },
  {
    question: 'What is the main purpose of a customer relationship management system?',
    options: ['Operational CRM.',
              'Analytical CRM.', 
              'Reduce errors that occur.',
               'Maintaining customer relationships.'],
    answer: 'Maintaining customer relationships.',
  },
  {
    question: 'What does an information system do?',
    options: ['Manage Finances',
              'Process information',
              'Create data' 
              ],
    answer: 'Process information',
  },
  {
    question: 'An information system integration will not allow all the functional areas to communicate and share data?',
    options: [
      'True',
      'False'
    ],
    answer: 'False',
  },
  {
    question: 'The analytical CRM system can be used for segmentation, personalization, response analysis, attrition analysis and aligning supply',
    options: ['True', 'False'],
    answer: 'True',
  },
  {
    question: 'One of the types of customer relationship management systems is a operational CRM.',
    options: [
      'True',
      'False'
     
    ],
    answer: 'True',
  },
  {
    question: 'Auatomation is not a benifit of information system integration in a business.',
    options: ['True', 'False'],
    answer: 'False',
  },
  {
    question: 'Efficiency is a benifit of information system integration?',
    options: [
      'True',
      'Flase'
    ],
    answer: 'True',
  },
  {
    question: 'Information system integration in a business is the process of connecting information from various functional areas into a single unit',
    options: ['True', 'Flase'],
    answer: 'True',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();