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