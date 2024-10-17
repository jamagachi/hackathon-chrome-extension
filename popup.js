const addSiteButton = document.getElementById('add-site');
const removeSiteButton = document.getElementById('remove-site');
const visitedUrlDisplay = document.getElementById('visited-url-display');

// load the tracked sites from the background.js script
chrome.storage.sync.get(['trackedSites'], (result) => {
  const trackedSites = result.trackedSites || {};
  updateDisplay(trackedSites);
});

// function to update the tracked sites display:
function updateDisplay(trackedSites) {
  visitedUrlDisplay.innerHTML = '';
  for (const [domain, count] of Object.entries(trackedSites)) {
    const siteElement = document.createElement('div');
    siteElement.textContent = `${domain}: ${count}`;
    visitedUrlDisplay.appendChild(siteElement);
  }
}

// button toadd the current website
addSiteButton.addEventListener('click', async () => {
  // console log to check if button works
  console.log('Button Clicked');
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);
  const domain = url.hostname;

  chrome.runtime.sendMessage({ action: 'addSite', domain }, (response) => {
    if (response.success) {
      // reload the tracked sites, updates display for the user
      chrome.storage.sync.get(['trackedSites'], (result) => {
        const trackedSites = result.trackedSites || {};
        updateDisplay(trackedSites);
      });
      // console log to check if getting response from background, not working
      console.log('Response from background:', response);
    }
  });
});

// Remove current website
removeSiteButton.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);
  const domain = url.hostname;

  chrome.runtime.sendMessage({ action: 'removeSite', domain });
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
