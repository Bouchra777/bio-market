
document.addEventListener("DOMContentLoaded", function () {
  // Add hamburger menu button to the header
  const header = document.querySelector("header");
  const navMenu = document.querySelector(".nav-menu");

  // Create the menu toggle button
  const menuToggle = document.createElement("button");
  menuToggle.className = "menu-toggle";
  menuToggle.innerHTML = "☰";
  header.appendChild(menuToggle);

  // Toggle menu when hamburger is clicked
  menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking elsewhere
  document.addEventListener("click", function (event) {
    if (!header.contains(event.target)) {
      navMenu.classList.remove("active");
    }
  });

  // Responsive handling for window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      navMenu.classList.remove("active");
    }
  });
});