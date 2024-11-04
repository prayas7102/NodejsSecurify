const express = require('express');
const Joi = require('joi');

const app = express();

app.get('/api/user', (req, res) => {
  const schema = Joi.object({
    id: Joi.number().integer().min(1).required(),
  });

  const { error, value } = schema.validate(req.query);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { id } = value;
  // Your logic to handle the request using the validated 'id'
  res.json({ userId: id });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
