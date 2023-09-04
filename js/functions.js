window.onload = function () {
  // Hide the loading page
  document.getElementById("loading-page").style.display = "none";
  
  // Display the actual content
  document.getElementById("content").style.display = "block";
};
 

document.addEventListener("DOMContentLoaded", function () {
  // Get the navbar collapse element
  const navbarCollapse = document.querySelector(".navbar-collapse");

  // Get all the nav links inside the navbar
  const navLinks = navbarCollapse.querySelectorAll(".nav-link");

  // Add a click event listener to each nav link
  navLinks.forEach(function (navLink) {
      navLink.addEventListener("click", function () {
          // Check if the navbar collapse element is open
          if (navbarCollapse.classList.contains("show")) {
              // Close the navbar collapse
              navbarCollapse.classList.remove("show");
          }
      });
  });
});