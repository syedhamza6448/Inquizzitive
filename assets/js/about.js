document.addEventListener("DOMContentLoaded", () => {
  // Horizontal scroll tracking for section titles
  const uniqueContainer = document.getElementById("uniqueContainer")
  const valuesContainer = document.getElementById("valuesContainer")
  const uniqueTitle = document.getElementById("uniqueTitle")
  const valuesTitle = document.getElementById("valuesTitle")

  // Function to handle scroll tracking
  function handleScrollTracking(container, title) {
    if (!container || !title) return

    container.addEventListener("scroll", () => {
      const scrollLeft = container.scrollLeft
      const maxScroll = container.scrollWidth - container.clientWidth
      const scrollProgress = maxScroll > 0 ? scrollLeft / maxScroll : 0

      // Add visual feedback based on scroll progress
      const opacity = 0.7 + scrollProgress * 0.3
      title.style.opacity = opacity

      // Add subtle color change based on scroll
      const hue = 200 + scrollProgress * 20 // Shift from blue to cyan
      title.style.color = `hsl(${hue}, 60%, 60%)`
    })
  }

  // Initialize scroll tracking
  handleScrollTracking(uniqueContainer, uniqueTitle)
  handleScrollTracking(valuesContainer, valuesTitle)

  // Smooth scroll behavior for horizontal containers
  function addSmoothScrolling(container) {
    if (!container) return

    let isScrolling = false
    let scrollTimeout

    container.addEventListener("scroll", () => {
      if (!isScrolling) {
        container.style.scrollBehavior = "smooth"
        isScrolling = true
      }

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isScrolling = false
      }, 150)
    })
  }

  // Add smooth scrolling to containers
  addSmoothScrolling(uniqueContainer)
  addSmoothScrolling(valuesContainer)

  // Add keyboard navigation for horizontal scroll
  function addKeyboardNavigation(container) {
    if (!container) return

    container.addEventListener("keydown", (e) => {
      const cardWidth = 370 // Card width + gap

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault()
          container.scrollBy({ left: -cardWidth, behavior: "smooth" })
          break
        case "ArrowRight":
          e.preventDefault()
          container.scrollBy({ left: cardWidth, behavior: "smooth" })
          break
      }
    })

    // Make container focusable
    container.setAttribute("tabindex", "0")
  }

  // Add keyboard navigation
  addKeyboardNavigation(uniqueContainer)
  addKeyboardNavigation(valuesContainer)

  // Add scroll indicators
  function addScrollIndicators(container) {
    if (!container) return

    const indicator = document.createElement("div")
    indicator.className = "scroll-indicator"
    indicator.innerHTML = `
      <div class="scroll-dots">
        <span class="scroll-hint">Scroll horizontally →</span>
      </div>
    `

    container.parentElement.appendChild(indicator)

    // Hide indicator after first scroll
    let hasScrolled = false
    container.addEventListener("scroll", () => {
      if (!hasScrolled) {
        indicator.style.opacity = "0"
        hasScrolled = true
        setTimeout(() => {
          indicator.remove()
        }, 300)
      }
    })
  }

  // Add scroll indicators for desktop only
  if (window.innerWidth > 768) {
    addScrollIndicators(uniqueContainer)
    addScrollIndicators(valuesContainer)
  }
})

// Add CSS for scroll indicators
const style = document.createElement("style")
style.textContent = `
  .scroll-indicator {
    text-align: center;
    padding: 1rem;
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  .scroll-hint {
    color: var(--accent);
    font-size: 0.9rem;
    opacity: 0.7;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }

  @media (max-width: 768px) {
    .scroll-indicator {
      display: none;
    }
  }
`
document.head.appendChild(style)
