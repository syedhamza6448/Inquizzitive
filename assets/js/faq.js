document.addEventListener("DOMContentLoaded", () => {
  // FAQ Accordion functionality
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    const answer = item.querySelector(".faq-answer")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Close all other FAQ items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active")
        }
      })

      // Toggle current item
      if (isActive) {
        item.classList.remove("active")
      } else {
        item.classList.add("active")
      }
    })

    // Add keyboard support
    question.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        question.click()
      }
    })

    // Make focusable
    question.setAttribute("tabindex", "0")
  })

  // Smooth scroll to FAQ item if hash is present
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1)
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: "smooth" })
        // Auto-open the FAQ item if it's a question
        const faqItem = targetElement.closest(".faq-item")
        if (faqItem) {
          faqItem.classList.add("active")
        }
      }, 100)
    }
  }

  // Search functionality (if search input exists)
  const searchInput = document.getElementById("faqSearch")
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase()

      faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question h3").textContent.toLowerCase()
        const answer = item.querySelector(".faq-answer p").textContent.toLowerCase()

        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
          item.style.display = "block"
          // Highlight search term if found
          if (searchTerm && (question.includes(searchTerm) || answer.includes(searchTerm))) {
            item.classList.add("search-highlight")
          } else {
            item.classList.remove("search-highlight")
          }
        } else {
          item.style.display = "none"
          item.classList.remove("search-highlight")
        }
      })
    })
  }
})

// Add CSS for search highlighting
const style = document.createElement("style")
style.textContent = `
  .search-highlight {
    border: 2px solid var(--accent);
    animation: searchPulse 1s ease-in-out;
  }

  @keyframes searchPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }
`
document.head.appendChild(style)
