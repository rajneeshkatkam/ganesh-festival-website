
//Loading Page Function
window.onload = function () {
  // Hide the loading page
  document.getElementById("loading-page").style.display = "none";
  
  // Display the actual content
  document.getElementById("content").style.display = "block";
};


document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("dropdown-button");
  const dropdownContent = document.getElementById("dropdown-content");

  // Add a click event listener to the document
  document.addEventListener("click", function (event) {
      if (event.target !== button && !dropdownContent.contains(event.target)) {
          // Click was outside the button and dropdown content, hide the dropdown
          dropdownContent.style.display = "none";
      }
  });

  // Add a scroll event listener to the window
  window.addEventListener("scroll", function () {
      // Hide the dropdown when scrolling occurs
      dropdownContent.style.display = "none";
  });

  // Add a click event listener to the button to toggle the dropdown
  button.addEventListener("click", function () {
      if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
      } else {
          dropdownContent.style.display = "block";
      }
  });
});




// Function to advance the carousel to the next slide
function nextSlide(carouselId) {
  $(carouselId).carousel('next');
}

function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        var offset = section.getBoundingClientRect().top + window.scrollY - 60;
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
    // nextSlide('#visarjan-carousel');
    // nextSlide('#social-activities-carousel');
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

// function hideall_carousels(){
//     document.getElementById("gallery-carousel").style.display = "none";
//     // document.getElementById("visarjan-carousel").style.display = "none";
//     // document.getElementById("social-activities-carousel").style.display = "none";
// }

function gallery_carousel(card_selected){

    console.log(card_selected);
    document.getElementById("gallery-carousel").style.display = "block";

    
    
}

// Function to check if an image exists at a given URL
function checkImageExists(imageUrl, callback) {
  var img = new Image();
  img.onload = function() {
      // Image exists, execute the callback with true
      callback(true);
  };
  img.onerror = function() {
      // Image does not exist, execute the callback with false
      callback(false);
  };
  img.src = imageUrl;
}


function add_images_carousel(card_selected){

  // Initialize an empty array to store image URLs
  var imageUrls = [];

  // Define the base path and the number of images
  var basePath = gallery_image_path+card_selected+'/'+card_selected+'-';
  var numberOfImages = 100;

  // Generate image URLs and add them to the array
  for (var i = 1; i <= numberOfImages; i++) {
      // Use padStart to ensure two-digit numbers (e.g., '01', '02', ..., '100')
      var imageUrl = `${basePath}${i.toString().padStart(2, '0')}.jpg`;
      imageUrls.push(imageUrl);
  }

  console.log(imageUrls)
  console.log(imageUrls.length)
  

  // Get the carousel inner element
  var carouselInner = document.getElementById('carousel-inner');

  // Loop through the image URLs and create carousel items
  for (var i = 0; i < imageUrls.length; i++) {
    var imageUrl = imageUrls[i];
    // Use a variable to track whether the image exists
    var imageExists = false;

    checkImageExists(imageUrl, function(exists) {
      if (exists) {
          console.log('Image exists.');
          imageExists = true;

          var carouselItem = document.createElement('div');
          carouselItem.className = 'carousel-item';
      
          // For the first image, add the 'active' class to make it the initial active item
          if (i === 0) {
              carouselItem.classList.add('active');
          }
      
          var image = document.createElement('img');
          image.className = 'gallery-image card';
          image.src = imageUrl;
          image.alt = 'ganpati pic ' + (i + 1);
      
          carouselItem.appendChild(image);
          carouselInner.appendChild(carouselItem);
      }
    });

    // Check the value of imageExists and break out of the loop if necessary
    if (!imageExists) {
      console.log('Image does not exist.', imageUrl);
      break;
  }

  }

}




$(document).ready(function () {

  // // Initially, these two carousels would be hidden
  // document.getElementById("visarjan-carousel").style.display = "none";
  // document.getElementById("social-activities-carousel").style.display = "none";

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



  // An array of image URLs
  var imageUrls = [
    'images/adarsh-nagar-ganpati-1.jpg',
    'images/ganpati-1-min.jpg',
    // Add more image URLs here 
  ];

  add_images_carousel('Aagman')
});




// document.addEventListener('DOMContentLoaded', function () {
//   const cards = document.getElementsByClassName('galler-card'); // Select all elements with the 'card' class
//   const targetElement = document.getElementById('gallery-carousel'); // Replace with the actual ID of your target element

//   // Add a click event listener to each card
//   for (const card of cards) {
//       card.addEventListener('click', function () {
//           targetElement.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling to the target element
//       });
//   }
// });


// document.addEventListener('DOMContentLoaded', function () {
//   const cards = document.querySelectorAll('.gallery-image-card'); // Select all elements with the 'my-scroll-trigger' class
//   const targetElement = document.querySelector('.ganpati-carousel'); // Select the target element with the 'scroll-target' class

//   // Add a click event listener to each card
//   for (const card of cards) {
//       card.addEventListener('click', function () {
//           targetElement.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling to the target element
//       });
//   }
// });


// document.addEventListener('DOMContentLoaded', function () {
//   const cards = document.querySelectorAll('.gallery-image-card'); // Select all elements with the 'my-scroll-trigger' class
//   const targetElements = document.querySelectorAll('.ganpati-carousel'); // Select all elements with the 'scroll-target' class

//   cards.forEach(function (card, index) {
//       card.addEventListener('click', function () {
//           // Scroll to the corresponding target element based on its index
//           if (targetElements[index]) {
//             const targetPosition = targetElements[index].offsetTop - 70; // Calculate 60 pixels above the target element
//             window.scrollTo({ top: targetPosition, behavior: 'smooth' });
//         }
//       });
//   });
// });













