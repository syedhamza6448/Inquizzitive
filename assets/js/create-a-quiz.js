// Quiz data structure
let quizData = {
  title: "",
  description: "",
  difficulty: "Easy",
  category: "General",
  timeLimit: 10,
  questions: [
    {
      id: 1,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    },
  ],
  theme: "default",
  customColors: {
    primary: "#f0f0f3",
    accent: "#8ecae6",
    text: "#111111",
  },
}

// DOM elements
const questionsContainer = document.getElementById("questionsContainer")
const questionCount = document.getElementById("questionCount")
const addQuestionBtn = document.getElementById("addQuestionBtn")
const themeSelect = document.getElementById("themeSelect")
const colorInputs = document.getElementById("colorInputs")
const primaryColor = document.getElementById("primaryColor")
const accentColor = document.getElementById("accentColor")
const textColor = document.getElementById("textColor")
const primaryPreview = document.getElementById("primaryPreview")
const themeSkeleton = document.getElementById("themeSkeleton")
const primarySkeletonBar = document.getElementById("primarySkeletonBar")
const createQuizBtn = document.getElementById("createQuizBtn")

// Quiz Preview Elements
const previewTitle = document.getElementById("previewTitle")
const previewCategory = document.getElementById("previewCategory")
const previewDifficulty = document.getElementById("previewDifficulty")
const previewTimer = document.getElementById("previewTimer")
const previewProgressText = document.getElementById("previewProgressText")
const previewProgressFill = document.getElementById("previewProgressFill")
const previewQuestionNumber = document.getElementById("previewQuestionNumber")
const previewQuestionText = document.getElementById("previewQuestionText")
const previewOptions = document.getElementById("previewOptions")

// Initialize the quiz builder
function init() {
  renderQuestions()
  setupEventListeners()
  updateQuestionCounter()
  updateQuizPreview()
}

// Setup event listeners
function setupEventListeners() {
  addQuestionBtn.addEventListener("click", addQuestion)
  themeSelect.addEventListener("change", handleThemeChange)
  primaryColor.addEventListener("input", updateThemePreview)
  accentColor.addEventListener("input", updateThemePreview)
  textColor.addEventListener("input", updateThemePreview)
  createQuizBtn.addEventListener("click", createQuiz)

  // Basic form inputs
  document.getElementById("quizTitle").addEventListener("input", (e) => {
    quizData.title = e.target.value
    updateQuizPreview()
  })

  document.getElementById("quizDescription").addEventListener("input", (e) => {
    quizData.description = e.target.value
  })

  document.getElementById("quizDifficulty").addEventListener("change", (e) => {
    quizData.difficulty = e.target.value
    updateQuizPreview()
  })

  document.getElementById("quizCategory").addEventListener("change", (e) => {
    quizData.category = e.target.value
    updateQuizPreview()
  })

  document.getElementById("timeLimit").addEventListener("input", (e) => {
    quizData.timeLimit = Number.parseInt(e.target.value) || 1
    updateQuizPreview()
  })
}

// Render all questions
function renderQuestions() {
  questionsContainer.innerHTML = ""
  quizData.questions.forEach((question, index) => {
    const questionElement = createQuestionElement(question, index)
    questionsContainer.appendChild(questionElement)
  })
  updateQuizPreview()
}

// Create a single question element
function createQuestionElement(question, index) {
  const questionDiv = document.createElement("div")
  questionDiv.className = "question"
  questionDiv.dataset.questionId = question.id

  questionDiv.innerHTML = `
        ${
          quizData.questions.length > 1
            ? `
            <button class="remove-btn" onclick="removeQuestion(${question.id})" style='font-size: 2rem;'>&times;</button>
        `
            : ""
        }
        
        <div class="question-header">Question ${index + 1}</div>
        
        <div class="form-group">
            <label>Question Text</label>
            <input type="text" 
                   value="${question.question}" 
                   placeholder="Enter your question"
                   onchange="updateQuestion(${question.id}, 'question', this.value)">
        </div>
        
        <div class="form-group">
            <label>Answer Options</label>
            <div class="mcq-options">
                ${question.options
                  .map(
                    (option, optionIndex) => `
                    <div class="option-row">
                        <span class="option-label">${String.fromCharCode(65 + optionIndex)}.</span>
                        <input type="text" 
                               class="option-input"
                               value="${option}" 
                               placeholder="Option ${String.fromCharCode(65 + optionIndex)}"
                               onchange="updateQuestionOption(${question.id}, ${optionIndex}, this.value)">
                        <input type="radio" 
                               class="option-radio"
                               name="correct-${question.id}" 
                               value="${optionIndex}"
                               ${question.correctAnswer === optionIndex ? "checked" : ""}
                               onchange="updateQuestion(${question.id}, 'correctAnswer', ${optionIndex})">
                    </div>
                `,
                  )
                  .join("")}
                <p class="correct-answer-note">Select the radio button next to the correct answer</p>
            </div>
        </div>
    `

  return questionDiv
}

// Add a new question
function addQuestion() {
  const newQuestion = {
    id: Date.now(),
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  }

  quizData.questions.push(newQuestion)
  renderQuestions()
  updateQuestionCounter()
}

// Remove a question
function removeQuestion(questionId) {
  if (quizData.questions.length > 1) {
    quizData.questions = quizData.questions.filter((q) => q.id !== questionId)
    renderQuestions()
    updateQuestionCounter()
  }
}

// Update question data
function updateQuestion(questionId, field, value) {
  const question = quizData.questions.find((q) => q.id === questionId)
  if (question) {
    question[field] = value
    updateQuizPreview()
  }
}

// Update question option
function updateQuestionOption(questionId, optionIndex, value) {
  const question = quizData.questions.find((q) => q.id === questionId)
  if (question) {
    question.options[optionIndex] = value
    updateQuizPreview()
  }
}

// Update question counter
function updateQuestionCounter() {
  questionCount.textContent = quizData.questions.length
  updateQuizPreview()
}

// Handle theme change
function handleThemeChange() {
  const theme = themeSelect.value
  quizData.theme = theme

  if (theme === "custom") {
    colorInputs.classList.add("show")
    updateThemePreview()
  } else {
    colorInputs.classList.remove("show")
    resetThemePreview()
  }
}

// Update theme preview
function updateThemePreview() {
  if (quizData.theme === "custom") {
    const primary = primaryColor.value
    const accent = accentColor.value
    const text = textColor.value

    quizData.customColors = { primary, accent, text }

    // Update theme skeleton
    themeSkeleton.style.backgroundColor = primary
    primarySkeletonBar.style.backgroundColor = accent
    primarySkeletonBar.style.color = text

    // Update quiz preview with custom colors
    updateQuizPreviewColors(primary, accent, text)
  } else {
    resetThemePreview()
  }
}

// Reset theme preview
function resetThemePreview() {
  themeSkeleton.style.backgroundColor = "var(--primary)"
  primarySkeletonBar.style.backgroundColor = "var(--accent)"
  primarySkeletonBar.style.color = "var(--text)"

  // Reset quiz preview colors
  updateQuizPreviewColors("var(--primary)", "var(--accent)", "var(--text)")
}

// Update quiz preview colors
function updateQuizPreviewColors(primary, accent, text) {
  const previewContainer = document.getElementById("quizPreviewContainer")
  if (previewContainer) {
    previewContainer.style.backgroundColor = primary
    previewContainer.style.color = text

    // Update badges
    const badges = previewContainer.querySelectorAll(".quiz-preview-badge")
    badges.forEach((badge) => {
      badge.style.backgroundColor = accent
      badge.style.color = text
    })

    // Update option letters
    const optionLetters = previewContainer.querySelectorAll(".option-letter")
    optionLetters.forEach((letter) => {
      letter.style.backgroundColor = accent
      letter.style.color = text
    })

    // Update progress fill
    const progressFill = previewContainer.querySelector(".progress-fill")
    if (progressFill) {
      progressFill.style.backgroundColor = accent
    }

    // Update navigation buttons
    const navBtns = previewContainer.querySelectorAll(".nav-btn")
    navBtns.forEach((btn) => {
      btn.style.backgroundColor = accent
      btn.style.color = text
    })
  }
}

// Update quiz preview
function updateQuizPreview() {
  // Update title
  previewTitle.textContent = quizData.title || "Sample Quiz Title"

  // Update category and difficulty
  previewCategory.textContent = quizData.category
  previewDifficulty.textContent = quizData.difficulty

  // Update timer
  const minutes = Math.floor(quizData.timeLimit)
  const seconds = (quizData.timeLimit % 1) * 60
  previewTimer.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`

  // Update progress
  const totalQuestions = quizData.questions.length
  previewProgressText.textContent = `Question 1 of ${totalQuestions}`
  previewProgressFill.style.width = `${(1 / totalQuestions) * 100}%`

  // Update question display
  const firstQuestion = quizData.questions[0]
  if (firstQuestion) {
    previewQuestionNumber.textContent = "Question 1"
    previewQuestionText.textContent = firstQuestion.question || "What is your sample question?"

    // Update options
    const optionElements = previewOptions.querySelectorAll(".quiz-option")
    optionElements.forEach((optionEl, index) => {
      const optionText = optionEl.querySelector(".option-text")
      if (optionText) {
        optionText.textContent = firstQuestion.options[index] || `Sample Option ${String.fromCharCode(65 + index)}`
      }
    })
  }

  // Apply current theme colors if custom theme is selected
  if (quizData.theme === "custom") {
    updateQuizPreviewColors(quizData.customColors.primary, quizData.customColors.accent, quizData.customColors.text)
  }
}

// Create quiz
function createQuiz() {
  // Validate quiz data
  if (!quizData.title.trim()) {
    alert("Please enter a quiz title")
    return
  }

  if (!quizData.description.trim()) {
    alert("Please enter a quiz description")
    return
  }

  // Check if all questions are filled
  for (let i = 0; i < quizData.questions.length; i++) {
    const question = quizData.questions[i]

    if (!question.question.trim()) {
      alert(`Please enter text for Question ${i + 1}`)
      return
    }

    // Check if all options are filled
    for (let j = 0; j < question.options.length; j++) {
      if (!question.options[j].trim()) {
        alert(`Please fill all options for Question ${i + 1}`)
        return
      }
    }
  }

  // Log quiz data (in a real app, this would be sent to a server)
  console.log("Quiz Created:", quizData)

  // Show success message
  alert("Quiz created successfully! Check the console for quiz data.")

  // Optional: Reset form or redirect
  // resetForm();
}

// Reset form (optional)
function resetForm() {
  quizData = {
    title: "",
    description: "",
    difficulty: "Easy",
    category: "General",
    timeLimit: 10,
    questions: [
      {
        id: 1,
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      },
    ],
    theme: "default",
    customColors: {
      primary: "#f0f0f3",
      accent: "#8ecae6",
      text: "#111111",
    },
  }

  // Reset form inputs
  document.getElementById("quizTitle").value = ""
  document.getElementById("quizDescription").value = ""
  document.getElementById("quizDifficulty").value = "Easy"
  document.getElementById("quizCategory").value = "General"
  document.getElementById("timeLimit").value = "10"
  themeSelect.value = "default"

  // Re-render
  renderQuestions()
  updateQuestionCounter()
  handleThemeChange()
  updateQuizPreview()
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", init)
