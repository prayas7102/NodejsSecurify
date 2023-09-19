const express = require('express');
const Joi = require('joi');

const app = express();

app.put('/api/user/:id', (req, res) => {
  const schema = Joi.object({
    id: Joi.number().integer().min(1).required(),
    name: Joi.string().min(3).max(30).required(),
  });

  const validationObject = {
    id: req.params.id,
    name: req.body.name,
  };

  const { error, value } = schema.validate(validationObject);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { id, name } = value;
  // Your logic to handle the request using the validated 'id' and 'name'
  res.json({ userId: id, name });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
