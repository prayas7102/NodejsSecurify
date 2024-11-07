const express = require('express');
const app = express();

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Improper input validation: No checks on email format or password requirements.
  // Allows injection of special characters and potentially malformed email addresses.

  // Logic to authenticate user (not shown here)
  // ...

  res.send('Login successful!');
});

app.put('/update-profile', (req, res) => {
    const { name, bio } = req.body;
  
    // Improper input validation: No checks on name or bio format, length, or allowed characters.
    // This can lead to XSS attacks or storage of harmful content in the database.
  
    // Logic to update user profile (not shown here)
    // ...
  
    res.send('Profile updated successfully!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});