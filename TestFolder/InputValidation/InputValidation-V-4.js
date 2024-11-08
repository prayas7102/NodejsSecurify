const express = require('express');
const cors = require('cors');
const Joi = require('joi');
const app = express();

app.use(cors());

app.get('/data', (req, res) => {
  res.send('Data accessed successfully!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});