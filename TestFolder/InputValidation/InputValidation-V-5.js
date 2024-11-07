const express = require('express');
const app = express();

app.get('/calculate-tax', (req, res) => {
  const salary = parseFloat(req.query.salary);

  // Improper input validation: No checks on the format of 'salary' input.
  // This can lead to unexpected behavior if 'salary' is not a valid number.

  const tax = salary * 0.15;
  res.send(`Tax calculated: ${tax}`);
});

app.get('/greet', (req, res) => {
    const name = req.query.name;
  
    // Improper input validation: No sanitization on 'name' input.
    // This can lead to cross-site scripting (XSS) if the input is untrusted.
  
    res.send(`<p>Hello, ${name}</p>`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});