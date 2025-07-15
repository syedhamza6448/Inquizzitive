document.addEventListener("DOMContentLoaded", () => {
  // Horizontal scroll tracking for sticky headers
  const scrollSections = document.querySelectorAll(".horizontal-scroll-section")

  scrollSections.forEach((section) => {
    const container = section.querySelector(".horizontal-scroll-container")
    const title = section.querySelector(".scroll-section-title")

    if (container && title) {
      container.addEventListener("scroll", () => {
        const scrollPercentage = container.scrollLeft / (container.scrollWidth - container.clientWidth)
        const hue = scrollPercentage * 60 // Change hue from 0 to 60 degrees
        title.style.filter = `hue-rotate(${hue}deg)`
      })
    }
  })

  // Smooth scroll for internal links
  const internalLinks = document.querySelectorAll('a[href^="#"]')
  internalLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Counter animation for stats
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number")
        statNumbers.forEach((stat) => {
          const finalValue = stat.textContent
          const numericValue = Number.parseInt(finalValue.replace(/\D/g, ""))
          const suffix = finalValue.replace(/[\d,]/g, "")

          animateCounter(stat, 0, numericValue, suffix, 2000)
        })
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  const missionSection = document.querySelector(".mission-section")
  if (missionSection) {
    observer.observe(missionSection)
  }

  function animateCounter(element, start, end, suffix, duration) {
    const startTime = performance.now()
    const range = end - start

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(start + range * easeOutQuart)

      element.textContent = formatNumber(current) + suffix

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      }
    }

    requestAnimationFrame(updateCounter)
  }

  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K"
    }
    return num.toString()
  }

  // Parallax effect for floating blobs
  let ticking = false

  function updateParallax() {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".floating-blob")

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1
      const yPos = -(scrolled * speed)
      element.style.transform = `translateY(${yPos}px)`
    })

    ticking = false
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax)
      ticking = true
    }
  }

  window.addEventListener("scroll", requestTick)

  // Enhanced hover effects for cards
  const cards = document.querySelectorAll(".horizontal-card, .story-card, .mission-card, .cta-card")

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })
})
