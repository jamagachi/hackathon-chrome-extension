# hackathon-chrome-extension

// High Level:

// Chrome extension for people who want to reduce distractions from going to the same website over and over
// Button/Text Input within popup that allows users to select websites they would like to limit
// Until the user hits their limit, popup shows visit tracker
// Popup that suggests options from a list of 'healthier' websites
// A second counter with a reinforcing message pops up when the user visits the healthy sites

// Main Menu:

- appears when user clicks on extension
- Features:
- Button
- Input Form
- Current Counters Display

// Event Response Pop-Ups:

- appear when user visits a site
- Features:
- Visits Healthy Site: popup - positive reinforcement message
- Visits Bad Habit Site: popup - Show tracker and suggest healthier sites || IF Limit reached: pushState() changes their current url to a healthier one.

// Test Case:
// Negative: Instagram & Facebook
// -counter
// -object with website as key & counter as value
// -message suggesting healthy sites
// PositiveCSX and Stack Overflow
// -counter
// -object with website as key & counter as value
// -positive reinforcement message

//////////////////

Main Goals:

1. Get URL from visited site and save in a variable

- maybe fetch API with Get request?

2. Successfully get tracker to increment from specified site visit

3. Stop popup from popping up more than once per unique site visit

4. Create counter object

- change saved url assignments to a prop in the obj w/ counter value

5. Display updated tracker and any message on popup

6. Include image in popup

7. Get chrome exstension icon to work!!!!!

////////// Structure Guide:
Create these files:
manifest.json
popup.html (for the popup UI)
popup.js (for the logic in the popup)
background.js (for managing visits and tracking site usage)
content.js (for injecting code into web pages if necessary)
Any CSS files if you need custom styles
