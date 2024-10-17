console.log('Hi');

// Send a message to background.js to request data
chrome.runtime.sendMessage({ action: 'getVisitedURL' }, (response) => {
  // Log the response from background.js
  console.log('Visited URL:', response.visitedURL);

  // Display the visited URL in the popup (assuming an element with id "visited-url-display")
  document.getElementById(
    'visited-url-display'
  ).textContent = `Visited: ${response.visitedURL}`;
});

// document.addEventListener('DOMContentLoaded', () => {
//   // Text input to add new site:
//   const siteInputBar = document.getElementById('site-input');
//   // Button to add current site:
//   const addSiteButton = document.getElementById('add-site');

//   siteInputBar.addEventListener('keypress', function (e) {
//     if (e.key === 'Enter') {
//       // Add the site inputted to siteInputBar to list of tracked sites
//     }
//   });

//   // When the user clicks the button to add the current site:
//   addSiteButton.addEventListener('click', () => {
//     // Add the current website to list of tracked sites
//   });
// });
