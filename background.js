// Initialize the visitedURL variable (for demonstration purposes)
let visitedURL = 'https://www.google.com/';

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getVisitedURL') {
    // Send back the visitedURL variable as the response
    sendResponse({ visitedURL: visitedURL });
  }
});

// Gives us the current visited webpage's full url (including protocol, domain, path, query params, etc)
// const visitedPage = window.location.href;

// For Additional Access To Specific Parts Of The URL:
// window.location.protocol (e.g., "https:")
// window.location.hostname (e.g., "example.com")
// window.location.pathname (e.g., "/page")
// window.location.search (e.g., "?query=example")

// Navigates to a new URL, but replaces the current page in the history
// window.location.replace('https://example.com');

// Immediately redirects the browser to the passed in URL but still adds old page to history,
// allowing user to use 'back' button to visit it
// window.location.assign('https://example.com');
// export { visitedURL };
