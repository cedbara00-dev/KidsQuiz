let currentQuestion = 0;
let score = 0;

const questionEl = document.querySelector('.question');
const optionsEl = document.querySelector('.options');
const resultEl = document.querySelector('.result-container');
const scoreEl = document.getElementById('score');
const restartBtn = document.querySelector('.restart-btn');
const imageEl = document.getElementById('questionImage');
const startBtn = document.getElementById('startQuizBtn');
const welcomeScreen = document.querySelector('.welcome-container');
const quizContainer = document.querySelector('.quiz-container');
const progressBar = document.querySelector('.progress-bar');

// Start Quiz
startBtn.addEventListener('click', () => {
    welcomeScreen.style.display = 'none';
    quizContainer.style.display = 'block';
    resultEl.style.display = 'none'; // ensure result hidden
    loadQuestion();
});

// Load Question
function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        endQuiz();
        return;
    }

    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = currentQuiz.question;
    imageEl.src = currentQuiz.image;
    imageEl.alt = currentQuiz.question;

    optionsEl.innerHTML = '';
    currentQuiz.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;

        button.addEventListener('click', () => checkAnswer(button, option));
        optionsEl.appendChild(button);
    });

    const progressPercent = ((currentQuestion) / quizData.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

// Check Answer
function checkAnswer(button, selectedOption) {
    const correctAnswer = quizData[currentQuestion].answer;
    document.querySelectorAll('.option').forEach(btn => btn.disabled = true);

    if (selectedOption === correctAnswer) {
        score++;
        button.classList.add('correct');
        launchConfettiBurst(button);
    } else {
        button.classList.add('wrong');
    }

    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 900);
}

// Confetti
function launchConfettiBurst(button) {
    const rect = button.getBoundingClientRect();
    const burstCount = 30;

    for (let i = 0; i < burstCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = rect.left + rect.width / 2 + 'px';
        confetti.style.top = rect.top + rect.height / 2 + 'px';
        confetti.style.setProperty('--hue', Math.random() * 360);

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 100 + 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        confetti.style.transform = `translate(0,0)`;
        confetti.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
        document.body.appendChild(confetti);

        requestAnimationFrame(() => {
            confetti.style.transform = `translate(${x}px, ${y}px)`;
            confetti.style.opacity = 0;
        });

        setTimeout(() => confetti.remove(), 900);
    }
}

// End Quiz
function endQuiz() {
    quizContainer.style.display = 'none';
    resultEl.style.display = 'flex';

    const totalQuestions = quizData.length;
    const percentage = (score / totalQuestions) * 100;

    let message = "";
    if (percentage === 100) {
        message = "🎉 Amazing Job! 🎉";
    } else if (percentage >= 70) {
        message = "Great Job!";
    } else if (percentage >= 50) {
        message = "Good Effort! Keep Practicing!";
    } else {
        message = "Keep Practicing! You can do it!";
    }

    scoreEl.textContent = `Your Score: ${score}/${totalQuestions}`;
    document.querySelector('.result-message').textContent = message;
}

// Restart Quiz
restartBtn.addEventListener('click', () => {
    resultEl.style.display = 'none';
    quizContainer.style.display = 'none';
    welcomeScreen.style.display = 'flex';
    currentQuestion = 0;
    score = 0;
    progressBar.style.width = '0%';
});
