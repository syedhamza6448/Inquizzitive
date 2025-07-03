document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector('.features-scroll-section');
  const track = document.querySelector('.card-track');
  const cards = document.querySelectorAll('.feature-card');

  const maxScroll = section.offsetHeight - window.innerHeight;
  const maxTranslateX = track.scrollWidth - window.innerWidth;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const sectionTop = section.offsetTop;

    if (scrollY >= sectionTop && scrollY <= sectionTop + maxScroll) {
      const scrollProgress = (scrollY - sectionTop) / maxScroll;
      const translateX = -scrollProgress * maxTranslateX;
      track.style.transform = `translateX(${translateX}px)`;

      cards.forEach((card, index) => {
        const cardStart = index / cards.length;
        const cardEnd = (index + 1) / cards.length;

        if (scrollProgress >= cardStart && scrollProgress < cardEnd) {
          card.classList.add("animate");
        } else {
          card.classList.remove("animate");
        }
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const howItWorksSection = document.querySelector(".how-it-works");
  const stepStairs = document.querySelector(".steps-stairs");
  const step1 = document.getElementById("step-1");
  const step2 = document.getElementById("step-2");
  const step3 = document.getElementById("step-3");

  function isFullyInView(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  function handleScroll() {
    if (isFullyInView(howItWorksSection)) {
      // Apply stair-step layout
      step1.style.transform = "translateX(-400px)";
      step2.style.transform = "translateX(0)";
      step3.style.transform = "translateX(350px)";
      stepStairs.style.gap = "20px"
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Trigger initially
});

// document.addEventListener("DOMContentLoaded", () => {
//   const glitchText = document.getElementById("glitch-text");
//   const words = ["Popular", "Latest"];
//   let index = 0;

//   setInterval(() => {
//     index = (index + 1) % words.length;
//     glitchText.textContent = words[index];

//     glitchText.classList.remove("glitch-animation");
//     void glitchText.offsetWidth; // Force reflow
//     glitchText.classList.add("glitch-animation");
//   }, 2000);
// });
// For the use of switcinhg between 2 words in .feature-quiz section


// Modal/Alert
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("quiz-modal");
  const closeModal = document.getElementById("close-modal");

  const modalTitle = document.getElementById("modal-title");
  const modalDifficulty = document.getElementById("modal-difficulty");
  const modalTime = document.getElementById("modal-time");
  const modalQuestions = document.getElementById("modal-questions");
  const modalCategory = document.getElementById("modal-category");

  // Attach click listeners to all detail icons
  document.querySelectorAll(".detail-quiz").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent link behavior if any
      e.stopPropagation(); // Stop bubbling

      const card = icon.closest(".quiz-card");

      // Pull data from the clicked card
      modalTitle.textContent = card.querySelector(".quiz-title").childNodes[0].textContent.trim();
      modalDifficulty.textContent = card.querySelector(".quiz-difficulty span").textContent;
      modalTime.textContent = card.querySelector(".quiz-time span").textContent;
      modalQuestions.textContent = card.querySelector(".quiz-question span").textContent;
      modalCategory.textContent = card.querySelector(".quiz-category span").textContent;

      // Show the modal
      modal.style.display = "flex";

      // Re-render icons
      lucide.createIcons();
    });
  });

  // Close the modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal if clicked outside content
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

// CTA Block
const circle = document.getElementById("cta-circle");
const ctaContent = document.getElementById("cta-content");
const ctaBtn = document.querySelector(".cta-btn");
const ctaWrapper = document.querySelector(".cta-wrapper");

window.addEventListener("scroll", () => {
  const wrapperTop = ctaWrapper.getBoundingClientRect().top;
  const wrapperHeight = ctaWrapper.offsetHeight;
  const windowHeight = window.innerHeight;

  const progress = 1 - (wrapperTop / windowHeight); // value from 0 to >1

  if (progress > 0 && progress < 2) {
    // Scale and move circle
    circle.style.transform = `translate(-50%, -${progress * 100}%) scale(${Math.min(progress * 3, 3)})`;

    // Show text and button in middle phase
    if (progress > 0.5 && progress < 1.5) {
      ctaContent.style.opacity = "1";
      ctaBtn.style.opacity = "1";
    } else {
      ctaContent.style.opacity = "0";
      ctaBtn.style.opacity = "0";
    }
  } else {
    circle.style.transform = "translate(-50%, 0%) scale(0)";
    ctaContent.style.opacity = "0";
    ctaBtn.style.opacity = "0";
  }
});



