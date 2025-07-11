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
const accentPreview = document.getElementById("accentPreview")
const createQuizBtn = document.getElementById("createQuizBtn")

// Lucide icon library
const lucide = {
  createIcons: () => {
    // Placeholder for icon creation logic
    console.log("Icons created")
  },
}

// Initialize the quiz builder
function init() {
  renderQuestions()
  setupEventListeners()
  updateQuestionCounter()
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
  })

  document.getElementById("quizDescription").addEventListener("input", (e) => {
    quizData.description = e.target.value
  })

  document.getElementById("quizDifficulty").addEventListener("change", (e) => {
    quizData.difficulty = e.target.value
  })

  document.getElementById("quizCategory").addEventListener("change", (e) => {
    quizData.category = e.target.value
  })

  document.getElementById("timeLimit").addEventListener("input", (e) => {
    quizData.timeLimit = Number.parseInt(e.target.value) || 1
  })
}

// Render all questions
function renderQuestions() {
  questionsContainer.innerHTML = ""
  quizData.questions.forEach((question, index) => {
    const questionElement = createQuestionElement(question, index)
    questionsContainer.appendChild(questionElement)
  })
  lucide.createIcons() // Re-initialize icons
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
            <button class="remove-btn" onclick="removeQuestion(${question.id})" style='font-size: 2rem;'>&times</button>
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
  }
}

// Update question option
function updateQuestionOption(questionId, optionIndex, value) {
  const question = quizData.questions.find((q) => q.id === questionId)
  if (question) {
    question.options[optionIndex] = value
  }
}

// Update question counter
function updateQuestionCounter() {
  questionCount.textContent = quizData.questions.length
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

    primaryPreview.style.backgroundColor = primary
    primaryPreview.style.color = text
    accentPreview.style.backgroundColor = accent
    accentPreview.style.color = text
  }
}

// Reset theme preview
function resetThemePreview() {
  primaryPreview.style.backgroundColor = "var(--primary)"
  primaryPreview.style.color = "var(--text)"
  accentPreview.style.backgroundColor = "var(--accent)"
  accentPreview.style.color = "var(--text)"
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
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", init)
