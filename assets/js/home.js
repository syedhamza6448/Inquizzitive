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
