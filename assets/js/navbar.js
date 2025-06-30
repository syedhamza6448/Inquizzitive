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
  const toggleTheme = () => {
    const isDark = document.body.classList.toggle("dark-mode");
    const icon = isDark ? "sun" : "moon";
    desktopToggle.innerHTML = `<i class="fas fa-${icon}"></i>`;
    mobileToggle.innerHTML = `<i class="fas fa-${icon}"></i>`;
  };

  desktopToggle.addEventListener("click", toggleTheme);
  mobileToggle.addEventListener("click", toggleTheme);
});
