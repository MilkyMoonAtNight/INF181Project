const quizData = [
    {
      question: 'Will AI improve your business against rivals not using AI?',
      options: ['Yes.', 'No.'],
      answer: 'Yes.',
    },
    {
      question: 'Do you still need human validation over the AIs work?',
      options: ['No, not while it is well trained.', 'Yes,technical errors can still occur.'],
      answer: 'Yes,technical errors can still occur.',
    },
    {
      question: 'Over 77% of the companies today use AI. Do you think it has improved their business?',
      options: ['Yes, the AI opened much more doors for the business.', 'No, the companies are holding their own with or without.', 'Yes, but AI did not improve their networth.', 'No, AI is a huge expense'],
      answer: 'Yes, it is in the Ts and Cs.',
    },
    {
      question: 'Will AI take over the human resources of a company?:',
      options: ['Yes, it can learn and improve.', 'No, there are much more factors that a computer can not compriehend.', 'Yes, just the basics.', 'No, it is not reliable.'],
      answer: 'No, there are much more factors that a computer can not compriehend.',
    },
    {
      question: 'Can AI use data unethically?',
      options: [
        'Yes, depending how it was trained.',
        'No, it will know that the data is fragile.',
      ],
      answer: 'Yes, depending how it was trained.',
    },
    {
      question: 'Can AI take unskilled labour jobs?',
      options: ['Yes', 'No'],
      answer: 'Yes',
    },
    {
      question: 'Should you buy or make your own AI for your business. ',
      options: [
        'Make it, to fit the companies needs.',
        'Buy it, it can be trained afterwards.',
        'Buy it, it will be cheaper.',
        'buy it, AI software is a all in one package.',
      ],
      answer: 'Make it, to fit the companies needs.',
    },
    {
      question: 'How long should AI be trained to be perfect?',
      options: ['3 months', '6 Months - 1 Year', '5+ Years', '1 Year - 4 Years'],
      answer: '6 Months - 1 Year',
    },
    {
      question: 'Should companies impliment AI in their business?',
      options: [
        'Yes, it improves profit.',
        'No, The human aspect is what keeps it pure.',
        'No, AI can cause horror on a company.',
        'No, morale in the workspace will be bad.',
      ],
      answer: 'Yes, it improves profit.',
    },
    {
      question: 'What is AI?',
      options: ['Science of making machines that can think like humans.', 'It is a Computer that can research and present due to inputs.', 'Personalised Computer', 'Client of a netwrk.'],
      answer: 'Lion',
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