const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.post('/verify-token', (req, res) => {
  const token = req.headers.authorization;

  // Improper input validation: No checks on token format or existence.
  // This can lead to security issues if the token is malformed or missing.

  const decodedToken = jwt.verify(token, 'secret_key');
  res.send('Token verified successfully!');
});

app.get('/search', (req, res) => {
    const pattern = req.query.pattern;
  
    // Improper input validation: No checks on the pattern input.
    // Could lead to Regular Expression Denial of Service (ReDoS) attacks.
  
    const regex = new RegExp(pattern);
    res.send('Search executed successfully!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});