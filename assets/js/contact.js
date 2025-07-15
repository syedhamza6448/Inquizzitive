document.addEventListener("DOMContentLoaded", () => {
  // Star rating functionality
  const starRating = document.getElementById("starRating")
  const ratingValue = document.getElementById("ratingValue")
  const stars = starRating.querySelectorAll(".star")

  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      const rating = index + 1
      ratingValue.value = rating

      // Update star display
      stars.forEach((s, i) => {
        if (i < rating) {
          s.classList.add("active")
        } else {
          s.classList.remove("active")
        }
      })
    })

    star.addEventListener("mouseenter", () => {
      const rating = index + 1
      stars.forEach((s, i) => {
        if (i < rating) {
          s.classList.add("active")
        } else {
          s.classList.remove("active")
        }
      })
    })
  })

  starRating.addEventListener("mouseleave", () => {
    const currentRating = Number.parseInt(ratingValue.value)
    stars.forEach((s, i) => {
      if (i < currentRating) {
        s.classList.add("active")
      } else {
        s.classList.remove("active")
      }
    })
  })

  // Form submissions
  const contactForm = document.getElementById("contactForm")
  const reviewForm = document.getElementById("reviewForm")
  const contactSuccess = document.getElementById("contactSuccess")
  const reviewSuccess = document.getElementById("reviewSuccess")

  // Contact form submission
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Simulate form submission
    setTimeout(() => {
      showSuccessMessage(contactSuccess)
      contactForm.reset()
    }, 500)
  })

  // Review form submission
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Check if rating is selected
    if (ratingValue.value === "0") {
      alert("Please select a rating before submitting your review.")
      return
    }

    // Simulate form submission
    setTimeout(() => {
      showSuccessMessage(reviewSuccess)
      reviewForm.reset()
      ratingValue.value = "0"
      stars.forEach((star) => star.classList.remove("active"))
    }, 500)
  })

  // Show success message
  function showSuccessMessage(element) {
    element.classList.add("show")

    setTimeout(() => {
      element.classList.remove("show")
    }, 3000)
  }

  // Form input animations
  const inputs = document.querySelectorAll("input, textarea")
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused")
    })

    input.addEventListener("blur", function () {
      if (this.value === "") {
        this.parentElement.classList.remove("focused")
      }
    })
  })
})
