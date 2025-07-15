// Enhanced floating icons functionality with tooltips and scroll effects
document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll(".floating-icons")
  const heroSection = document.querySelector(".hero")

  // Add hover effects and tooltips for icons
  icons.forEach((icon, index) => {
    // Add scroll parallax effect
    const speed = 0.5 + index * 0.1 // Different speeds for each icon

    icon.addEventListener("mouseenter", () => {
      icon.style.transform = `scale(1.3) translateY(-15px)`
      icon.style.filter = "drop-shadow(0 15px 25px rgba(0,0,0,0.4))"
      icon.style.zIndex = "10"

      // Show tooltip via cursor system
      const cursor = document.querySelector(".cursor-circle")
      const cursorLabel = document.querySelector(".cursor-label")
      if (cursor && cursorLabel) {
        cursor.classList.add("cursor-hovered")
        cursorLabel.textContent = icon.getAttribute("data-label") || "Hover"
      }
    })

    icon.addEventListener("mouseleave", () => {
      icon.style.transform = "scale(1) translateY(0px)"
      icon.style.filter = "none"
      icon.style.zIndex = "1"

      // Hide tooltip
      const cursor = document.querySelector(".cursor-circle")
      const cursorLabel = document.querySelector(".cursor-label")
      if (cursor && cursorLabel) {
        cursor.classList.remove("cursor-hovered")
        cursorLabel.textContent = ""
      }
    })

    // Add click animation
    icon.addEventListener("click", () => {
      icon.style.animation = "none"
      icon.style.transform = "scale(0.9) rotate(360deg)"
      setTimeout(() => {
        icon.style.animation = "floatIcon 6s ease-in-out infinite"
        icon.style.transform = "scale(1) rotate(0deg)"
      }, 300)
    })
  })

  // Scroll parallax effect for icons
  function handleIconScroll() {
    if (!heroSection) return

    const scrolled = window.pageYOffset
    const heroTop = heroSection.offsetTop
    const heroHeight = heroSection.offsetHeight

    // Only apply parallax when hero section is in view
    if (scrolled < heroTop + heroHeight) {
      icons.forEach((icon, index) => {
        const speed = 0.3 + index * 0.05 // Different speeds for depth effect
        const yPos = scrolled * speed
        const rotation = scrolled * 0.1

        // Apply transform while preserving hover effects
        if (!icon.matches(":hover")) {
          icon.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`
        }
      })
    }
  }

  // Throttled scroll handler for better performance
  let ticking = false
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(handleIconScroll)
      ticking = true
      setTimeout(() => {
        ticking = false
      }, 16) // ~60fps
    }
  }

  window.addEventListener("scroll", requestTick)
})

// Existing scroll functionality for features section
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".features-scroll-section")
  const track = document.querySelector(".card-track")
  const cards = document.querySelectorAll(".feature-card")

  if (section && track && cards.length > 0) {
    const maxScroll = section.offsetHeight - window.innerHeight
    const maxTranslateX = track.scrollWidth - window.innerWidth

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY
      const sectionTop = section.offsetTop

      if (scrollY >= sectionTop && scrollY <= sectionTop + maxScroll) {
        const scrollProgress = (scrollY - sectionTop) / maxScroll
        const translateX = -scrollProgress * maxTranslateX
        track.style.transform = `translateX(${translateX}px)`

        cards.forEach((card, index) => {
          const cardStart = index / cards.length
          const cardEnd = (index + 1) / cards.length

          if (scrollProgress >= cardStart && scrollProgress < cardEnd) {
            card.classList.add("animate")
          } else {
            card.classList.remove("animate")
          }
        })
      }
    })
  }
})

// Existing how it works section functionality
document.addEventListener("DOMContentLoaded", () => {
  const howItWorksSection = document.querySelector(".how-it-works")
  const stepStairs = document.querySelector(".steps-stairs")
  const step1 = document.getElementById("step-1")
  const step2 = document.getElementById("step-2")
  const step3 = document.getElementById("step-3")

  if (howItWorksSection && stepStairs && step1 && step2 && step3) {
    function isFullyInView(el) {
      const rect = el.getBoundingClientRect()
      return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    }

    function handleScroll() {
      if (isFullyInView(howItWorksSection)) {
        // Apply stair-step layout
        step1.style.transform = "translateX(-400px)"
        step2.style.transform = "translateX(0)"
        step3.style.transform = "translateX(350px)"
        stepStairs.style.gap = "20px"
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Trigger initially
  }
})

// For the use of switcinhg between 2 words in .feature-quiz section
document.addEventListener("DOMContentLoaded", () => {
  const glitchText = document.getElementById("glitch-text")
  const words = ["Popular", "Latest"]
  let index = 0

  setInterval(() => {
    index = (index + 1) % words.length
    glitchText.textContent = words[index]

    glitchText.classList.remove("glitch-animation")
    void glitchText.offsetWidth // Force reflow
    glitchText.classList.add("glitch-animation")
  }, 2000)
})

// Existing modal functionality
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("quiz-modal")
  const closeModal = document.getElementById("close-modal")

  if (modal && closeModal) {
    const modalTitle = document.getElementById("modal-title")
    const modalDifficulty = document.getElementById("modal-difficulty")
    const modalTime = document.getElementById("modal-time")
    const modalQuestions = document.getElementById("modal-questions")
    const modalCategory = document.getElementById("modal-category")

    // Attach click listeners to all detail icons
    document.querySelectorAll(".detail-quiz").forEach((icon) => {
      icon.addEventListener("click", (e) => {
        e.preventDefault() // Prevent link behavior if any
        e.stopPropagation() // Stop bubbling

        const card = icon.closest(".quiz-card")

        if (card && modalTitle && modalDifficulty && modalTime && modalQuestions && modalCategory) {
          // Pull data from the clicked card
          modalTitle.textContent = card.querySelector(".quiz-title").childNodes[0].textContent.trim()
          modalDifficulty.textContent = card.querySelector(".quiz-difficulty span").textContent
          modalTime.textContent = card.querySelector(".quiz-time span").textContent
          modalQuestions.textContent = card.querySelector(".quiz-question span").textContent
          modalCategory.textContent = card.querySelector(".quiz-category span").textContent

          // Show the modal
          modal.style.display = "flex"

          // Re-render icons
          const lucide = window.lucide // Declare the lucide variable
          if (typeof lucide !== "undefined") {
            lucide.createIcons()
          }
        }
      })
    })

    // Close the modal
    closeModal.addEventListener("click", () => {
      modal.style.display = "none"
    })

    // Close modal if clicked outside content
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none"
      }
    })
  }
})

// Enhanced CTA Block functionality
const circle = document.getElementById("cta-circle")
const ctaContent = document.getElementById("cta-content")
const ctaBtn = document.querySelector(".cta-btn")
const ctaWrapper = document.querySelector(".cta-wrapper")
const orText = document.getElementById("cta-or")
const newsletter = document.getElementById("cta-newsletter")

if (circle && ctaContent && ctaBtn && ctaWrapper && orText && newsletter) {
  // Initial state
  ctaContent.style.display = "none"
  ctaBtn.style.display = "none"
  orText.style.display = "none"
  newsletter.style.display = "none"

  window.addEventListener("scroll", () => {
    const wrapperTop = ctaWrapper.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    const progress = 1 - wrapperTop / windowHeight // value from 0 to >1

    if (progress > 0 && progress < 2.5) {
      // Animate the circle
      circle.style.transform = `translate(-50%, -${progress * 100}%) scale(${Math.min(progress * 3, 3)})`

      // Show CTA content
      if (progress > 0.5 && progress < 1.1) {
        ctaContent.style.opacity = "1"
        ctaBtn.style.opacity = "1"
        ctaContent.style.display = "block"
        ctaBtn.style.display = "inline"
      } else {
        ctaContent.style.opacity = "0"
        ctaBtn.style.opacity = "0"
        ctaContent.style.display = "none"
        ctaBtn.style.display = "none"
      }

      // Show OR
      if (progress >= 1.1 && progress < 1.6) {
        orText.style.opacity = "1"
        orText.style.display = "block"
      } else {
        orText.style.opacity = "0"
        orText.style.display = "none"
      }

      // Show Newsletter
      if (progress >= 1.6) {
        newsletter.style.opacity = "1"
        newsletter.style.display = "flex"
      } else {
        newsletter.style.opacity = "0"
        newsletter.style.display = "none"
      }
    } else {
      // Reset everything when out of view
      circle.style.transform = "translate(-50%, 0%) scale(0)"
      ctaContent.style.opacity = "0"
      ctaBtn.style.opacity = "0"
      ctaContent.style.display = "none"
      ctaBtn.style.display = "none"
      orText.style.opacity = "0"
      orText.style.display = "none"
      newsletter.style.opacity = "0"
      newsletter.style.display = "none"
    }
  })
}
