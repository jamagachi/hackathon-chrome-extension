console.log('Background script is running'); // Debug log
let trackedSites = {};

// load tracked sites
chrome.storage.sync.get(['trackedSites'], (result) => {
  trackedSites = result.trackedSites || {};
});

// save tracked sites to storage
function saveTrackedSites() {
  chrome.storage.sync.set({ trackedSites }, () => {
    console.log('Tracked sites saved:', trackedSites); // Debug log
  });
}

// adding/removing sites:
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action, domain } = message;

  if (action === 'addSite') {
    // console log to check if the site is being added
    console.log('Adding site:', domain); 
    if (!trackedSites[domain]) {
      trackedSites[domain] = 1;
    } else {
      trackedSites[domain] += 1;
    }
    saveTrackedSites();
    // sends response back to the popup.js
    sendResponse({ success: true }); 
  } else if (action === 'removeSite') {
    delete trackedSites[domain];
    saveTrackedSites();
  }
});

// track number of visits
chrome.webNavigation.onCompleted.addListener((details) => {
  const url = new URL(details.url);
  const domain = url.hostname;

  if (trackedSites[domain]) {
    trackedSites[domain] += 1;
    saveTrackedSites(); // Save updated count
  }
});

// Gives us the current visited webpage's full url (including protocol, domain, path, query params, etc)
// const visitedPage = window.location.href;

// Navigates to a new URL, but replaces the current page in the history
// window.location.replace('https://example.com');

///////////////////////////// NOTES ////////////////////////
// For Additional Access To Specific Parts Of The URL:
// window.location.protocol (e.g., "https:")
// window.location.hostname (e.g., "example.com")
// window.location.pathname (e.g., "/page")
// window.location.search (e.g., "?query=example")

// Immediately redirects the browser to the passed in URL but still adds old page to history,
// allowing user to use 'back' button to visit it
// window.location.assign('https://example.com');
