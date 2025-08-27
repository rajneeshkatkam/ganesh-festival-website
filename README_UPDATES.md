# Gallery Updates - Year-based Tabs

## Changes Made

### 1. Directory Structure Created
- Created directories for 2024 and 2025 gallery images
- Copied 2023 images as placeholders for 2024 and 2025
- Structure: `images/gallery-images/{year}/{category}/`

### 2. HTML Updates (`index.html`)
- Added year tabs section below the Gallery heading
- Tabs: 2023, 2024, 2025 (2025 is default active)

### 3. CSS Updates (`css/styles.css`)
- Added `.year-tabs` styling
- Year tab buttons with gallery background color (#cc8400) - darker than gallery background
- Active and hover states use navbar color (#800020)
- Responsive design for mobile devices

### 4. JavaScript Updates (`js/functions.js`)
- Added `current_year` variable (default: '2025')
- Dynamic `gallery_image_path` based on selected year
- New `switchYear(year)` function to handle tab switching
- Updated initialization to load 2025 images by default

## Features
- ✅ Year tabs (2023, 2024, 2025)
- ✅ 2025 tab selected by default
- ✅ Tab buttons use gallery background color (darker shade)
- ✅ Smooth transitions and hover effects
- ✅ Responsive design
- ✅ Same carousel and card functionality for all years
- ✅ Placeholder images copied from 2023 for 2024 and 2025

## Usage
1. Users can click on year tabs to switch between different years
2. Gallery content updates dynamically based on selected year
3. All existing gallery functionality (carousel, cards, etc.) works for each year
4. Replace placeholder images in 2024 and 2025 folders with actual event photos

## File Structure
```
images/gallery-images/
├── 2023/ (original)
│   ├── Aagman/
│   ├── Bhog/
│   ├── Events/
│   ├── Health/
│   ├── Pooja/
│   └── Visarjan/
├── 2024/ (placeholders from 2023)
│   ├── Aagman/
│   ├── Bhog/
│   ├── Events/
│   ├── Health/
│   ├── Pooja/
│   └── Visarjan/
└── 2025/ (placeholders from 2023)
    ├── Aagman/
    ├── Bhog/
    ├── Events/
    ├── Health/
    ├── Pooja/
    └── Visarjan/
```

## Next Steps
1. Replace placeholder images in 2024 folders with actual 2024 event photos
2. Add actual 2025 event photos as they become available
3. Update image counts in JavaScript if different from 2023 counts
