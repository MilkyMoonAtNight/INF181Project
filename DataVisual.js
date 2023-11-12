const quizData = [
    {
      "question": "Data Visualization is the process of creating visual representations of data and information.",
      "options": ["True", "False"],
      "answer": "True"
    },
    {
      "question": "Bar charts are complex and challenging to read.",
      "options": ["True", "False"],
      "answer": "False"
    },
    {
      "question": "Line graphs can be misleading if the y-axis does not start at zero.",
      "options": ["True", "False"],
      "answer": "True"
    },
    {
      "question": "Pie charts are recommended when there are many categories of similar size.",
      "options": ["True", "False"],
      "answer": "False"
    },
    {
      "question": "Heatmaps are primarily used for visualizing website user interactions.",
      "options": ["True", "False"],
      "answer": "True"
    },
    {
      "question": "Scatter plots are effective for analyzing relationships between variables but can be challenging with large datasets.",
      "options": ["True", "False"],
      "answer": "True"
    },
    {
      "question": "Histograms represent the frequency of categorical data.",
      "options": ["True", "False"],
      "answer": "False"
    },
    {
      "question": "Tableau offers tools for data preparation, analysis, and sharing.",
      "options": ["True", "False"],
      "answer": "True"
    },
    {
      "question": "Power BI is specifically designed for data scientists.",
      "options": ["True", "False"],
      "answer": "False"
    },
    {
      "question": "Excel is widely used for data analysis and visualization but does not support pivot tables.",
      "options": ["True", "False"],
      "answer": "False"
    },
    {
      "question": "Simplicity is considered a key principle of effective data visualization.",
      "options": ["True", "False"],
      "answer": "True"
    },
    {
      "question": "Accuracy in data visualization is not crucial as long as the visuals look appealing.",
      "options": ["True", "False"],
      "answer": "False"
    },
    {
      "question": "Relevance in data visualization involves creating aesthetically pleasing visuals.",
      "options": ["True", "False"],
      "answer": "False"
    },
    {
      "question": "Using clear and concise labels is not considered a best practice in data visualization.",
      "options": ["True", "False"],
      "answer": "False"
    },
    {
      "question": "Incorporating interactivity in visualizations is not recommended.",
      "options": ["True", "False"],
      "answer": "False"
    },
    {
      "question": "Documenting charts with appropriate labels, scales, and data sources is a best practice.",
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