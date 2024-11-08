const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.post('/verify-token', (req, res) => {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, 'secret_key');
  res.send('Token verified successfully!');
});

app.get('/search', (req, res) => {
  const pattern = req.query.pattern;
  const regex = new RegExp(pattern);
  res.send('Search executed successfully!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});