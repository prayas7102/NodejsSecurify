const express = require('express');
const app = express();

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Logic to authenticate user

  res.send('Login successful!');
});

app.put('/update-profile', (req, res) => {
  const { name, bio } = req.body;
  
  // Logic to update user profile
  
  res.send('Profile updated successfully!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});