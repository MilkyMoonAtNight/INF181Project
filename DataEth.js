const quizData = [
    {
      question: 'Where does data security fall under?',
      options: ['Legal.', 'Moral.', 'Depends on the data.', 'None of the above.'],
      answer: 'Legal.',
    },
    {
      question: 'Does the POPI Act allow you to share your information?',
      options: ['Yes, only to trusted scources.', 'Yes, anything I can register to.', 'Yes, only if a company calls me.', 'No, but the way it will be stored and used is.'],
      answer: 'No, but the way it will be stored and used is.',
    },
    {
      question: 'Can Facebook share your interactions with sponsored posts?',
      options: ['Yes, it is in the Ts and Cs.', 'No, absolutely not!', 'Yes, only to the posts I like.', 'No, it is against the POPI Act.'],
      answer: 'Yes, it is in the Ts and Cs.',
    },
    {
      question: 'Is witholding private information about something or someone:',
      options: ['Unethical', 'Legal', 'Illegal', 'Morally okay'],
      answer: 'Morally okay',
    },
    {
      question: 'Does athority in the workspace have permission to bend the data ethics rules?',
      options: [
        'Yes, only the CEO.',
        'Yes, your project manager.',
        'Yes, if he pays R2 for hope.',
        'No, never.',
      ],
      answer: 'No, never.',
    },
    {
      question: 'Should concent be given before information retreval?',
      options: ['Yes', 'No'],
      answer: 'Yes',
    },
    {
      question: 'What will happen if you are tampering with personal information?',
      options: [
        'Arrested, it is a human rights violation.',
        'Fired, but it is not okay.',
        'Just A suspention.',
        'Scolded by the public.',
      ],
      answer: 'Arrested, it is a human rights violation.',
    },
    {
      question: 'Do you realise when your information got tampered with?',
      options: ['Yes, Athorities should contact me.', 'No, The companies holding my information is trusted.', 'Yes, the comany holding my information should contact me.', 'No, Companies share our informations to other companies for benifits/money.'],
      answer: 'Yes, the comany holding my information should contact me.',
    },
    {
      question: 'Can a celebratys information be leaked?',
      options: [
        'Yes, anyone giving out their personal information is vaunrable.',
        'No, celebs are untoutchable.',
        'Yes, it will get speard through the public due to their high rankings.',
      ],
      answer: 'Yes, anyone giving out their personal information is vaunrable.',
    },
    {
      question: 'Do banks get data breaches?',
      options: ['Yes, A lot of hackers are trying to steal identities.', 'No, their security is top notch.', 'Yes, but banks recover and handle information loss professionaly.', 'Yes, they lie to the public.'],
      answer: 'Yes, but banks recover and handle information loss professionaly.',
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