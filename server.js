const express = require('express');
const app = express();
const port = 3000;

// Function to generate the link based on the current count
const generateLink = (count) => {
  return count > 0
    ? `<p><a href="/${count - 1}">Take one down, patch it around</a></p>`
    : '<p>No more bugs left!</p>';
};

// Set up a route to display the current bug count and a link to fix bugs
app.get('/', (req, res) => {
  res.send(`
    <h1>${bugCount} little bugs in the code</h1>
    <h2>${bugCount} little bugs</h2>
    ${generateLink(bugCount)}
    <p><a href="/">Start over</a></p>
  `);
});

// Set up a route to decrease the bug count and potentially increase it randomly
app.get('/:count', (req, res) => {
  const count = parseInt(req.params.count, 10);

  // There's a 30% chance to randomly increase the bug count
  if (Math.random() < 0.3) {
    bugCount += Math.floor(Math.random() * 10) + 1;
  }

  res.send(`
    <h1>${count} little bugs in the code</h1>
    <h2>${count} little bugs</h2>
    ${generateLink(count)}
    <p><a href="/">Start over</a></p>
  `);
});

// Initialize the bug count
let bugCount = 99;

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

