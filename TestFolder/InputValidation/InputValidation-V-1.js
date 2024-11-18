const express = require('express');
const app = express();
const Joi = require('joi');

// Route to handle user registration
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  res.send('User registered successfully!');
});

// Route to handle search query
app.get('/search', (req, res) => {
  const searchTerm = req.query.q;

  res.send('Search results');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

