document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const desktopToggle = document.getElementById("desktopThemeToggle");
  const mobileToggle = document.getElementById("mobileThemeToggle");

  // Scroll floating effect
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("floating", window.scrollY > 0);
  });

  // Hamburger toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("open");
  });

  // Theme toggling logic
});
document.addEventListener("DOMContentLoaded", () => {
  const themeToggleInput = document.getElementById("input");

  // Initialize theme based on toggle
  if (themeToggleInput.checked) {
    document.body.classList.add("dark-mode");
  }

  themeToggleInput.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor-circle");
  const cursorLabel = document.querySelector(".cursor-label");

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;
  let labelTimeout;

  // Smooth cursor movement
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;

    const scale = cursor.classList.contains("cursor-hovered") ? 2.5 : 1;
    cursor.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  const hoverTargets = document.querySelectorAll("a, button, .illustration, .detail-quiz");

  hoverTargets.forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("cursor-hovered");

      const isNavbarLink = el.closest('.nav-left') || el.closest('.nav-right');
      cursor.classList.toggle("nav-hover", !!isNavbarLink);

      // Custom logic for detail-quiz
      let labelText;
      if (el.classList.contains("detail-quiz")) {
        labelText = "More Details";
      } else {
        labelText = el.getAttribute("data-label") || "Click!";
      }

      cursorLabel.textContent = labelText;

      clearTimeout(labelTimeout);
      labelTimeout = setTimeout(() => {
        cursorLabel.textContent = "";
      }, 5000);
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("cursor-hovered", "nav-hover");
      cursorLabel.textContent = "";
      clearTimeout(labelTimeout);
    });
  });

});
