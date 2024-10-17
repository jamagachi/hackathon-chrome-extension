const addSiteButton = document.getElementById('add-site');
const removeSiteButton = document.getElementById('remove-site');
const visitedSiteDisplay = document.getElementById('visited-url-display');

// load the tracked sites from the background.js script
chrome.storage.sync.get(['trackedSites'], (result) => {
  const trackedSites = result.trackedSites || {};
  updateDisplay(trackedSites);
});

// function to update the tracked sites display:
function updateDisplay(trackedSites) {
  visitedSiteDisplay.innerHTML = '';
  for (const [domain, count] of Object.entries(trackedSites)) {
    const siteElement = document.createElement('div');
    siteElement.textContent = `${domain}: ${count}`;
    visitedSiteDisplay.appendChild(siteElement);
  }
}

// button toadd the current website
addSiteButton.addEventListener('click', async () => {
  // console log to check if button works
  console.log('Button Clicked');
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);
  const siteName = url.hostname;

  chrome.runtime.sendMessage({ button: 'addSite', siteName }, (response) => {
    if (response.success) {
      // reload the tracked sites, updates display for the user
      chrome.storage.sync.get(['trackedSites'], (result) => {
        const trackedSites = result.trackedSites || {};
        updateDisplay(trackedSites);
      });
      // console log to check:
    }
  });
});

// when the user presses the remove site button:
removeSiteButton.addEventListener('click', async () => {
  //
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);
  const siteName = url.hostname;

  chrome.runtime.sendMessage({ button: 'removeSite', siteName }, (response) => {
    if (response.success) {
      // reload the tracked sites, updates display for the user
      chrome.storage.sync.get(['trackedSites'], (result) => {
        const trackedSites = result.trackedSites || {};
        updateDisplay(trackedSites);
      });
      // console log::
    }
  });
});
