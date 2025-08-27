
// Define the time interval (in milliseconds) for automatic scrolling
const interval = 3000;
let current_year = '2025'; // Default year
let gallery_image_path = 'images/gallery-images/' + current_year + '/';
let translations; // Store the loaded translations here
let contentElements;
let handleScrollelements;
let carouselInner;

// Card configuration mapping
const cardConfig = {
  'aagman-card.avif': {
    folderName: 'Aagman',
    translationKey: 'aagman-card-text'
  },
  'bhog-card.avif': {
    folderName: 'Bhog',
    translationKey: 'bhog-card-text'
  },
  'events-card.avif': {
    folderName: 'Events',
    translationKey: 'events-card-text'
  },
  'health-card.avif': {
    folderName: 'Health',
    translationKey: 'health-card-text'
  },
  'visarjan-card.avif': {
    folderName: 'Visarjan',
    translationKey: 'visarjan-card-text'
  },
  'pooja-card.avif': {
    folderName: 'Pooja',
    translationKey: 'pooja-card-text'
  }
};

// Store card data for each year
let yearCardData = {};


// //Loading Page Function
// window.onload = function () {
//   // Hide the loading page
//   document.getElementById("loading-page").style.display = "none";
  
//   // Display the actual content
//   document.getElementById("content").style.display = "block";
// };


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


function dropDownContentHide(){
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
      handleScroll(dropdownContent);
  }, { passive: true });

  // Add a click event listener to the button to toggle the dropdown
  button.addEventListener("click", function () {
      if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
      } else {
          dropdownContent.style.display = "block";
      }
  }, { passive: true });
}


// Function to schedule the next slide movement after a delay
function scheduleNextSlide() {

  setTimeout(function () {
    $('#gallery-carousel').carousel('next');
    // Schedule the next slide movement after 3 seconds (3000 milliseconds)
    scheduleNextSlide();
  }, interval);
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
function handleScroll(dropdownContent) {
  handleScrollelements.forEach((element) => {
      if (isElementInViewport(element)) {
          element.classList.add('fade-in');
      } else {
          element.classList.remove('fade-in'); // Remove the class when out of viewport
      }
  });
  dropdownContent.style.display = "none";
}





// Function to get count of images in a gallery folder
async function getImageCount(folderName) {
  try {
    // This is a simplified approach - in a real application, you might need
    // to implement a server-side endpoint to get folder contents
    // For now, we'll use predefined counts based on the existing structure
    const imageCounts = {
      'Aagman': {
        '2023': 9,
        '2024': 9,
        '2025': 9 // Considering the extra files found
      },
      'Bhog': {
        '2023': 10,
        '2024': 10,
        '2025': 11 // Considering the extra file found
      },
      'Events': {
        '2023': 10,
        '2024': 10,
        '2025': 10
      },
      'Health': {
        '2023': 5,
        '2024': 5,
        '2025': 5
      },
      'Pooja': {
        '2023': 2,
        '2024': 2,
        '2025': 2
      },
      'Visarjan': {
        '2023': 2,
        '2024': 2,
        '2025': 2
      }
    };
    
    return imageCounts[folderName] ? imageCounts[folderName][current_year] || 0 : 0;
  } catch (error) {
    console.error('Error getting image count:', error);
    return 0;
  }
}

// Function to check if an image exists
function imageExists(imagePath) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = imagePath;
  });
}

// Function to load card data for a specific year
async function loadCardDataForYear(year) {
  if (yearCardData[year]) {
    return yearCardData[year]; // Return cached data
  }
  
  const cardData = [];
  const cardImagePath = `images/gallery-images/${year}/card-images/`;
  
  // Check which card images exist for this year
  for (const [imageName, config] of Object.entries(cardConfig)) {
    const fullImagePath = cardImagePath + imageName;
    const exists = await imageExists(fullImagePath);
    
    if (exists) {
      const imageCount = await getImageCount(config.folderName);
      if (imageCount > 0) {
        cardData.push({
          imageName: imageName,
          imagePath: fullImagePath,
          folderName: config.folderName,
          translationKey: config.translationKey,
          imageCount: imageCount
        });
      }
    }
  }
  
  yearCardData[year] = cardData;
  return cardData;
}

// Function to create and display cards for current year
async function displayCardsForYear(year) {
  const cardContainer = document.getElementById('cardContainer');
  
  // Show loading state
  cardContainer.innerHTML = '<div class="loading-cards" style="text-align: center; padding: 20px;">Loading cards...</div>';
  
  try {
    const cardData = await loadCardDataForYear(year);
    
    // Clear loading state
    cardContainer.innerHTML = '';
    
    if (cardData.length === 0) {
      cardContainer.innerHTML = '<div class="no-cards" style="text-align: center; padding: 20px;">No cards available for this year</div>';
      return;
    }
    
    // Create cards based on available data
    cardData.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.className = 'gallery-image-card card shadow';
      cardElement.onclick = () => add_images_carousel(card.folderName, card.imageCount);
      
      cardElement.innerHTML = `
        <img src="${card.imagePath}" class="card-img-top" alt="Card Image" type="image/avif">
        <p class="card-text" data-translate="${card.translationKey}">${getTranslationText(card.translationKey)}</p>
      `;
      
      cardContainer.appendChild(cardElement);
    });
    
    // Update content with current translations
    if (translations) {
      updateContent();
    }
    
    // Adjust card layout
    adjustcards();
    
    // Load default carousel if cards are available
    if (cardData.length > 0) {
      add_images_carousel(cardData[0].folderName, cardData[0].imageCount);
    }
  } catch (error) {
    console.error('Error loading cards for year', year, ':', error);
    cardContainer.innerHTML = '<div class="error-cards" style="text-align: center; padding: 20px; color: red;">Error loading cards for this year</div>';
  }
}

// Helper function to get translation text
function getTranslationText(key) {
  if (translations && translations[key]) {
    return translations[key];
  }
  
  // Default text mapping
  const defaultText = {
    'aagman-card-text': 'Aagman',
    'bhog-card-text': '५६ Bhog',
    'events-card-text': 'Other Events',
    'health-card-text': 'Health Checkup',
    'visarjan-card-text': 'Visarjan',
    'pooja-card-text': 'Pooja'
  };
  
  return defaultText[key] || '';
}

// Function to switch between years
function switchYear(year) {
  // Update current year and gallery path
  current_year = year;
  gallery_image_path = 'images/gallery-images/' + current_year + '/';
  
  // Update active tab styling
  const tabs = document.querySelectorAll('.year-tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');
  
  // Clear current carousel
  carouselInner.innerHTML = '';
  
  // Display cards for the new year
  displayCardsForYear(year);
}

function add_images_carousel(card_selected, total_images_count){

  // Define the base path and the number of images
  var basePath = gallery_image_path+card_selected+'/'+card_selected+'-';
  carouselInner.innerHTML='';
  // Generate image URLs and add them to the array
  for (var i = 0; i < total_images_count; i++) {
      // Use padStart to ensure two-digit numbers (e.g., '01', '02', ..., '100')
      var imageUrl = `${basePath}${(i+1).toString().padStart(2, '0')}.avif`;

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


function adjustcards(){
  // Check the number of cards in the container
  const cards = cardContainer.querySelectorAll('.card');

  if (window.innerWidth >= 768 && cards.length <= 4) {
      cardContainer.style.justifyContent = 'center';
  } else {
      cardContainer.style.justifyContent = 'flex-start';
  }
}


 
// Multi language support functions


// Function to load translations
function loadTranslations(language) {
  // Load translations from the JSON file
  fetch('js/translations.json')
    .then((response) => response.json())
    .then((data) => {
      translations = data[language];
      updateContent();
    })
    .catch((error) => console.error('Error loading translations:', error));
}

// Function to update content with translations
function updateContent() {
  // Update both static and dynamic content elements
  const allContentElements = document.querySelectorAll('[data-translate]');
  allContentElements.forEach((element) => {
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




$(document).ready(function () {
  
  handleScrollelements = document.querySelectorAll('.fade-in-text');
  carouselInner = document.getElementById('carousel-inner');
  const cardContainer = document.getElementById('cardContainer');
  const scrollLeftButton = document.getElementById('scrollLeftButton');
  const scrollRightButton = document.getElementById('scrollRightButton');
  // Initial load for languages
  contentElements = document.querySelectorAll('[data-translate]');
  // Get the navbar collapse element
  const navbarCollapse = document.querySelector(".navbar-collapse");
  // Get all the nav links inside the navbar
  const navLinks = navbarCollapse.querySelectorAll(".nav-link");
  // Check the number of cards in the container
  const cards = cardContainer.querySelectorAll('.card');


  // Call the function to load cards and carousel images for the current year
  window.requestIdleCallback(() => {
    displayCardsForYear(current_year);
  });

  dropDownContentHide();
  loadTranslations('english'); // Default to English or your preferred default language


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
    updateScrollButtons();}
  ,{ passive: true });

  adjustcards();
  scheduleNextSlide();

});

















