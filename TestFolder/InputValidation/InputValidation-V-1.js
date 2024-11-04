const express = require('express');
const app = express();

// Route to handle user registration
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Improper input validation: No checks on input length or allowed characters
  // This makes the application vulnerable to various attacks like SQL injection, cross-site scripting (XSS), etc.

  // Save user to the database (not shown in this example)
  // ...

  res.send('User registered successfully!');
});

// Route to handle search query
app.get('/search', (req, res) => {
  const searchTerm = req.query.q;

  // Improper input validation: No sanitization or validation on the search term
  // This makes the application vulnerable to SQL injection, NoSQL injection, and other security issues.

  res.send('Search results');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

