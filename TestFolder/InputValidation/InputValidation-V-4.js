const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/data', (req, res) => {
  // Improper CORS configuration: No restrictions on allowed origins or methods.
  // This can expose sensitive data to unauthorized domains.

  res.send('Data accessed successfully!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});