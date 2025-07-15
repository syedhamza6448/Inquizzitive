// Sample quiz data - in a real app, this would come from an API
const sampleQuiz = {
  title: "JavaScript Fundamentals Quiz",
  category: "Technology",
  difficulty: "Medium",
  timeLimit: 10, // minutes
  questions: [
    {
      id: 1,
      question: "What is the correct way to declare a variable in JavaScript?",
      options: ["var myVariable;", "let myVariable;", "const myVariable;", "All of the above"],
      correctAnswer: 3,
    },
    {
      id: 2,
      question: "Which method is used to add an element to the end of an array?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      correctAnswer: 0,
    },
    {
      id: 3,
      question: "What does '===' operator do in JavaScript?",
      options: ["Compares values only", "Compares types only", "Compares both value and type", "Assigns a value"],
      correctAnswer: 2,
    },
    {
      id: 4,
      question: "Which of the following is NOT a JavaScript data type?",
      options: ["String", "Boolean", "Float", "Number"],
      correctAnswer: 2,
    },
    {
      id: 5,
      question: "What is the output of 'typeof null' in JavaScript?",
      options: ["null", "undefined", "object", "string"],
      correctAnswer: 2,
    },
  ],
}

// Quiz state
let currentQuestionIndex = 0
let userAnswers = []
let timeRemaining = 0
let timerInterval = null
let quizStartTime = null

// DOM elements
const quizTitle = document.getElementById("quizTitle")
const quizCategory = document.getElementById("quizCategory")
const quizDifficulty = document.getElementById("quizDifficulty")
const quizTimer = document.getElementById("quizTimer")
const progressFill = document.getElementById("progressFill")
const progressText = document.getElementById("progressText")
const questionNumber = document.getElementById("questionNumber")
const questionText = document.getElementById("questionText")
const quizOptions = document.getElementById("quizOptions")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")
const submitBtn = document.getElementById("submitBtn")
const quitBtn = document.getElementById("quitBtn")
const resultsModal = document.getElementById("resultsModal")
const closeModal = document.getElementById("closeModal")
const retakeBtn = document.getElementById("retakeBtn")
const homeBtn = document.getElementById("homeBtn")

// Initialize quiz
function initQuiz() {
  // Set quiz info
  quizTitle.textContent = sampleQuiz.title
  quizCategory.textContent = sampleQuiz.category
  quizDifficulty.textContent = sampleQuiz.difficulty

  // Initialize timer
  timeRemaining = sampleQuiz.timeLimit * 60 // Convert to seconds
  quizStartTime = Date.now()

  // Initialize user answers array
  userAnswers = new Array(sampleQuiz.questions.length).fill(null)

  // Start timer
  startTimer()

  // Display first question
  displayQuestion()

  // Setup event listeners
  setupEventListeners()
}

// Setup event listeners
function setupEventListeners() {
  // Navigation buttons
  prevBtn.addEventListener("click", goToPreviousQuestion)
  nextBtn.addEventListener("click", goToNextQuestion)
  submitBtn.addEventListener("click", submitQuiz)
  quitBtn.addEventListener("click", quitQuiz)

  // Modal buttons
  closeModal.addEventListener("click", closeResultsModal)
  retakeBtn.addEventListener("click", retakeQuiz)
  homeBtn.addEventListener("click", goHome)

  // Option selection
  quizOptions.addEventListener("click", handleOptionClick)
}

// Handle option click
function handleOptionClick(event) {
  const optionElement = event.target.closest(".quiz-option")
  if (!optionElement) return

  const optionIndex = Number.parseInt(optionElement.dataset.option)
  selectOption(optionIndex)
}

// Select an option
function selectOption(optionIndex) {
  // Remove previous selection
  const allOptions = quizOptions.querySelectorAll(".quiz-option")
  allOptions.forEach((option) => {
    option.classList.remove("selected")
    const radio = option.querySelector(".option-radio")
    radio.checked = false
  })

  // Select new option
  const selectedOption = quizOptions.querySelector(`[data-option="${optionIndex}"]`)
  selectedOption.classList.add("selected")
  const radio = selectedOption.querySelector(".option-radio")
  radio.checked = true

  // Store user answer
  userAnswers[currentQuestionIndex] = optionIndex

  // Update navigation buttons
  updateNavigationButtons()
}

// Display current question
function displayQuestion() {
  const question = sampleQuiz.questions[currentQuestionIndex]

  // Update question info
  questionNumber.textContent = `Question ${currentQuestionIndex + 1}`
  questionText.textContent = question.question

  // Update progress
  const progressPercentage = ((currentQuestionIndex + 1) / sampleQuiz.questions.length) * 100
  progressFill.style.width = `${progressPercentage}%`
  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${sampleQuiz.questions.length}`

  // Display options
  const optionElements = quizOptions.querySelectorAll(".quiz-option")
  optionElements.forEach((optionEl, index) => {
    const optionText = optionEl.querySelector(".option-text")
    optionText.textContent = question.options[index]

    // Clear previous selection
    optionEl.classList.remove("selected")
    const radio = optionEl.querySelector(".option-radio")
    radio.checked = false
  })

  // Restore user's previous answer if any
  const userAnswer = userAnswers[currentQuestionIndex]
  if (userAnswer !== null) {
    selectOption(userAnswer)
  }

  // Update navigation buttons
  updateNavigationButtons()
}

// Update navigation buttons
function updateNavigationButtons() {
  // Previous button
  prevBtn.disabled = currentQuestionIndex === 0

  // Next/Submit button
  const isLastQuestion = currentQuestionIndex === sampleQuiz.questions.length - 1

  if (isLastQuestion) {
    nextBtn.style.display = "none"
    submitBtn.style.display = "flex"
  } else {
    nextBtn.style.display = "flex"
    submitBtn.style.display = "none"
  }

  // Enable next/submit only if question is answered
  const hasAnswer = userAnswers[currentQuestionIndex] !== null
  nextBtn.disabled = !hasAnswer
  submitBtn.disabled = !hasAnswer
}

// Go to previous question
function goToPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--
    displayQuestion()
  }
}

// Go to next question
function goToNextQuestion() {
  if (currentQuestionIndex < sampleQuiz.questions.length - 1) {
    currentQuestionIndex++
    displayQuestion()
  }
}

// Start timer
function startTimer() {
  updateTimerDisplay()

  timerInterval = setInterval(() => {
    timeRemaining--
    updateTimerDisplay()

    if (timeRemaining <= 0) {
      clearInterval(timerInterval)
      submitQuiz()
    }
  }, 1000)
}

// Update timer display
function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  quizTimer.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

  // Change color when time is running low
  if (timeRemaining <= 60) {
    quizTimer.style.color = "var(--error)"
    quizTimer.style.animation = "pulse 1s infinite"
  } else if (timeRemaining <= 300) {
    quizTimer.style.color = "var(--warning)"
  }
}

// Submit quiz
function submitQuiz() {
  // Stop timer
  if (timerInterval) {
    clearInterval(timerInterval)
  }

  // Calculate results
  const results = calculateResults()

  // Show results modal
  showResults(results)
}

// Calculate quiz results
function calculateResults() {
  let correctAnswers = 0

  sampleQuiz.questions.forEach((question, index) => {
    if (userAnswers[index] === question.correctAnswer) {
      correctAnswers++
    }
  })

  const totalQuestions = sampleQuiz.questions.length
  const percentage = Math.round((correctAnswers / totalQuestions) * 100)

  // Calculate time taken
  const timeElapsed = sampleQuiz.timeLimit * 60 - timeRemaining
  const minutesTaken = Math.floor(timeElapsed / 60)
  const secondsTaken = timeElapsed % 60
  const timeTaken = `${minutesTaken}:${secondsTaken.toString().padStart(2, "0")}`

  return {
    correctAnswers,
    totalQuestions,
    percentage,
    timeTaken,
    difficulty: sampleQuiz.difficulty,
  }
}

// Show results modal
function showResults(results) {
  // Update result display
  document.getElementById("scorePercentage").textContent = `${results.percentage}%`
  document.getElementById("correctAnswers").textContent = `${results.correctAnswers}/${results.totalQuestions}`
  document.getElementById("timeTaken").textContent = results.timeTaken
  document.getElementById("resultDifficulty").textContent = results.difficulty

  // Show modal
  resultsModal.style.display = "flex"
}

// Close results modal
function closeResultsModal() {
  resultsModal.style.display = "none"
}

// Retake quiz
function retakeQuiz() {
  // Reset quiz state
  currentQuestionIndex = 0
  userAnswers = new Array(sampleQuiz.questions.length).fill(null)
  timeRemaining = sampleQuiz.timeLimit * 60

  // Clear timer
  if (timerInterval) {
    clearInterval(timerInterval)
  }

  // Reset timer display
  quizTimer.style.color = "var(--text)"
  quizTimer.style.animation = "none"

  // Close modal
  closeResultsModal()

  // Restart quiz
  initQuiz()
}

// Go to home page
function goHome() {
  window.location.href = "/"
}

// Quit quiz
function quitQuiz() {
  if (confirm("Are you sure you want to quit the quiz? Your progress will be lost.")) {
    goHome()
  }
}

// Handle page visibility change (pause timer when tab is not active)
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    if (timerInterval) {
      clearInterval(timerInterval)
    }
  } else {
    if (timeRemaining > 0) {
      startTimer()
    }
  }
})

// Prevent accidental page refresh
window.addEventListener("beforeunload", (event) => {
  if (timeRemaining > 0) {
    event.preventDefault()
    event.returnValue = "Are you sure you want to leave? Your quiz progress will be lost."
  }
})

// Add pulse animation for timer
const style = document.createElement("style")
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`
document.head.appendChild(style)

// Initialize quiz when page loads
document.addEventListener("DOMContentLoaded", initQuiz)
