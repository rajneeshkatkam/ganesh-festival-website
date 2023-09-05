
//Loading Page Function
window.onload = function () {
  // Hide the loading page
  document.getElementById("loading-page").style.display = "none";
  
  // Display the actual content
  document.getElementById("content").style.display = "block";
};



// Function to advance the carousel to the next slide
function nextSlide() {
  $('#carouselExampleControls1').carousel('next');
}

// Function to check if an element is in the viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to handle the scroll event
function handleScroll() {
  const elements = document.querySelectorAll('.fade-in-text');
  elements.forEach((element) => {
      if (isElementInViewport(element)) {
          element.classList.add('fade-in');
      } else {
          element.classList.remove('fade-in'); // Remove the class when out of viewport
      }
  });
}


$(document).ready(function () {

  // Automatically advance the carousel every 3 seconds (3000 milliseconds)
  setInterval(nextSlide, 3000);

  // Attach the scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Trigger the animation for elements already in the viewport
  window.addEventListener('load', handleScroll);


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






