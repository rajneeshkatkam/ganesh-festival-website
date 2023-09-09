
//Loading Page Function
window.onload = function () {
  // Hide the loading page
  document.getElementById("loading-page").style.display = "none";
  
  // Display the actual content
  document.getElementById("content").style.display = "block";
};



// Function to advance the carousel to the next slide
function nextSlide(carouselId) {
  $(carouselId).carousel('next');
}

function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        var offset = section.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
            top: offset,
            behavior: 'smooth' // You can use 'auto' instead of 'smooth' for instant scrolling
        });
    }
}



// Define the time interval (in milliseconds) for automatic scrolling
const interval = 3000;
let lastTime = 0;

function animateCarousel(timestamp) {
  if (!lastTime) {
    lastTime = timestamp;
  }

  // Calculate the time difference
  const deltaTime = timestamp - lastTime;

  // Check if the time difference is greater than or equal to the interval
  if (deltaTime >= interval) {
    // Update the last time
    lastTime = timestamp;

    // Advance the carousels to the next slide
    nextSlide('#vighnaharta-carousel');
    nextSlide('#visarjan-carousel');
    nextSlide('#social-activities-carousel');
  }

  // Request the next animation frame
  requestAnimationFrame(animateCarousel);
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

function hideall_carousels(){
    document.getElementById("vighnaharta-carousel").style.display = "none";
    document.getElementById("visarjan-carousel").style.display = "none";
    document.getElementById("social-activities-carousel").style.display = "none";
}

function mandap_gallery_carousel(){
    console.log("Mandap Gallery");
    // Hide the loading page
    hideall_carousels();
    document.getElementById("vighnaharta-carousel").style.display = "block";
}

function visarjan_gallery_carousel(){
  console.log("Visarjan Gallery");
  // Hide the loading page
  hideall_carousels();
  document.getElementById("visarjan-carousel").style.display = "block";
}


function events_gallery_carousel(){
  console.log("Events Gallery");
  // Hide the loading page
  hideall_carousels();
  document.getElementById("social-activities-carousel").style.display = "block";
}



$(document).ready(function () {

  // Initially, these two carousels would be hidden
  document.getElementById("visarjan-carousel").style.display = "none";
  document.getElementById("social-activities-carousel").style.display = "none";

  // Start the animation loop
  requestAnimationFrame(animateCarousel);

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






