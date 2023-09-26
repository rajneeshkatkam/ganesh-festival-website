
// //Loading Page Function
// window.onload = function () {
//   // Hide the loading page
//   document.getElementById("loading-page").style.display = "none";
  
//   // Display the actual content
//   document.getElementById("content").style.display = "block";
// };


document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("dropdown-button");
  const dropdownContent = document.getElementById("dropdown-content");

  // Add a click event listener to the document
  document.addEventListener("click", function (event) {
      if (event.target !== button && !dropdownContent.contains(event.target)) {
          // Click was outside the button and dropdown content, hide the dropdown
          dropdownContent.style.display = "none";
      }
  }, { passive: true });

  // Add a scroll event listener to the window
  window.addEventListener("scroll", function () {
      // Hide the dropdown when scrolling occurs
      dropdownContent.style.display = "none";
  }, { passive: true });

  // Add a click event listener to the button to toggle the dropdown
  button.addEventListener("click", function () {
      if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
      } else {
          dropdownContent.style.display = "block";
      }
  }, { passive: true });
}, { passive: true });




// Function to advance the carousel to the next slide
function nextSlide(carouselId) {
  $(carouselId).carousel('next');
}

function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        var offset = section.getBoundingClientRect().top + window.scrollY - 55;
        window.scrollTo({
            top: offset,
            behavior: 'smooth' // You can use 'auto' instead of 'smooth' for instant scrolling
        });
    }
}



// Define the time interval (in milliseconds) for automatic scrolling
const interval = 3000;
let lastTime = 0;
const gallery_image_path='images/gallery-images/2023/';
let translations; // Store the loaded translations here
let contentElements;

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
    nextSlide('#gallery-carousel');
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





function add_images_carousel(card_selected, total_images_count){

  // Initialize an empty array to store image URLs
  var imageUrls = [];

  // Define the base path and the number of images
  var basePath = gallery_image_path+card_selected+'/'+card_selected+'-';
  var numberOfImages = total_images_count;

  // Generate image URLs and add them to the array
  for (var i = 1; i <= numberOfImages; i++) {
      // Use padStart to ensure two-digit numbers (e.g., '01', '02', ..., '100')
      var imageUrl = `${basePath}${i.toString().padStart(2, '0')}.avif`;
      imageUrls.push(imageUrl);
  }
  
  // Get the carousel inner element
  var carouselInner = document.getElementById('carousel-inner');

  // Remove all child elements with the class 'carousel-item'
  while (carouselInner.firstChild) {
    carouselInner.removeChild(carouselInner.firstChild);
  }

  // Loop through the image URLs and create carousel items
  for (var i = 0; i < imageUrls.length; i++) {
    var imageUrl = imageUrls[i];

    var carouselItem = document.createElement('div');
    carouselItem.className = 'carousel-item';

    // For the first image, add the 'active' class to make it the initial active item
    if (i === 0) {
        carouselItem.classList.add('active');
    }

    var image = document.createElement('img');
    image.className = 'gallery-image';
    image.src = imageUrl;
    image.alt = card_selected +' Pic ' + (i + 1);
    image.setAttribute('type', 'image/avif');

    carouselItem.appendChild(image);
    carouselInner.appendChild(carouselItem);

  }

}

function updateScrollButtons() {
  const maxScrollLeft = cardContainer.scrollWidth - cardContainer.clientWidth;
  scrollLeftButton.disabled = cardContainer.scrollLeft === 0;
  scrollRightButton.disabled = cardContainer.scrollLeft >= maxScrollLeft;
}

function add_images_carousel_background(card_selected, total_images_count){

    // Call the function to load carousel images in the background
    window.requestIdleCallback(() => {
      add_images_carousel(card_selected, total_images_count);
  });

}


$(document).ready(function () {


  // Initial load for languages
  contentElements = document.querySelectorAll('[data-translate]');
  loadTranslations('english'); // Default to English or your preferred default language


  // Attach the scroll event listener
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Trigger the animation for elements already in the viewport
  window.addEventListener('load', handleScroll, { passive: true });

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
      }, { passive: true });
  });

  // Call the function to load carousel images in the background
  window.requestIdleCallback(() => {
      //Add the images count in images/gallery-images/Aagman/ here.
      add_images_carousel('Aagman', 9);
  });


  // Start the animation loop
  requestAnimationFrame(animateCarousel);


  const cardContainer = document.getElementById('cardContainer');
  const scrollLeftButton = document.getElementById('scrollLeftButton');
  const scrollRightButton = document.getElementById('scrollRightButton');

  scrollRightButton.addEventListener('click', () => {
      cardContainer.scrollBy({
          left: 300, // Adjust the scroll distance
          behavior: 'smooth', // Smooth scrolling
      });
  }, { passive: true });

  scrollLeftButton.addEventListener('click', () => {
      cardContainer.scrollBy({
          left: -300, // Adjust the scroll distance
          behavior: 'smooth', // Smooth scrolling
      });
  }, { passive: true });

  cardContainer.addEventListener('scroll', () => {
      updateScrollButtons();
  }, { passive: true });

  // Check the number of cards in the container
  const cards = cardContainer.querySelectorAll('.card');

  if (window.innerWidth >= 768 && cards.length <= 4) {
      cardContainer.style.justifyContent = 'center';
  } else {
      cardContainer.style.justifyContent = 'flex-start';
  }

});


 
// Multi language support functions


// Function to load translations
function loadTranslations(language) {
  // Load translations from the JSON file
  fetch('js/translations.json')
    .then((response) => response.json())
    .then((data) => {
      translations = data[language];
      // console.log(translations)
      updateContent();
    })
    .catch((error) => console.error('Error loading translations:', error));
}

// Function to update content with translations
function updateContent() {
  // console.log(contentElements)
  contentElements.forEach((element) => {
    const key = element.getAttribute('data-translate');

    if (translations && translations[key+'-class']) {
      element.classList=[];
      element.classList=translations[key+'-class'];
    }

    if (translations && translations[key]) {
      element.textContent = translations[key];
    }

  });
}















