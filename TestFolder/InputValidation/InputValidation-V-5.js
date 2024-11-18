const Joi = require('joi');
const express = require('express');
const app = express();

app.get('/calculate-tax', (req, res) => {
  const salary = parseFloat(req.query.salary);
  const tax = salary * 0.15;
  res.send(`Tax calculated: ${tax}`);
});

app.get('/greet', (req, res) => {
  const name = req.query.name;
  res.send(`<p>Hello, ${name}</p>`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});