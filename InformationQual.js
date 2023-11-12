const quizData = [
  {
    "question": "Accuracy is solely concerned with being correct and does not consider how close the actual value is to the expected value.",
    "options": ["True", "False"],
    "answer": "False"
  },
  {
    "question": "Completeness is crucial for businesses relying on customer data, as missing information may lead to missed opportunities and reduced profitability.",
    "options": ["True", "False"],
    "answer": "True"
  },
  {
    "question": "Consistency ensures that data contributing to the same data item share the same assumptions, definitions, and time periods.",
    "options": ["True", "False"],
    "answer": "True"
  },
  {
    "question": "Timeliness in information refers only to when the information is required and does not involve its availability and the method of sourcing.",
    "options": ["True", "False"],
    "answer": "False"
  },
  {
    "question": "Precision is the smallest unit that can accurately represent the data and should always exceed accuracy to provide more detailed information.",
    "options": ["True", "False"],
    "answer": "False"
  },
  {
    "question": "Cost in the context of information quality only includes monetary expenses and excludes time.",
    "options": ["True", "False"],
    "answer": "False"
  },
  {
    "question": "Data correctness refers to the acceptability of approximate values for numerical data.",
    "options": ["True", "False"],
    "answer": "True"
  },
  {
    "question": "Conformity to needs and expectations involves tailoring the process to meet specific entity requirements but does not require flexibility and adaptability.",
    "options": ["True", "False"],
    "answer": "False"
  },
  {
    "question": "Data cleansing involves identifying and rectifying errors or inconsistencies in a database and is not crucial for ensuring accurate and reliable information.",
    "options": ["True", "False"],
    "answer": "False"
  },
  {
    "question": "Removing unwanted outliers is always recommended to improve the accuracy of data analysis.",
    "options": ["True", "False"],
    "answer": "False"
  },
  {
    "question": "Handling missing data by discarding observations with missing values is the most practical and effective approach.",
    "options": ["True", "False"],
    "answer": "False"
  },
  {
    "question": "Filling in missing values based on other observations is subject to assumptions, and the integrity of the data is not compromised.",
    "options": ["True", "False"],
    "answer": "False"
  },
  {
    "question": "Altering the method used to analyze the data to work around missing data is only feasible if the amount of missing data is substantial.",
    "options": ["True", "False"],
    "answer": "False"
  },
  {
    "question": "Data validation and quality assurance are unnecessary steps in the data cleansing process.",
    "options": ["True", "False"],
    "answer": "False"
  },
  {
    "question": "Testing the dataset at the end of the cleansing process involves answering questions to assess the integrity of the data, such as whether it proves or disproves a working theory.",
    "options": ["True", "False"],
    "answer": "True"
  }
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