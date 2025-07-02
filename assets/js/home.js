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


